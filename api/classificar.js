// Função serverless (Vercel) que recebe a mensagem livre da mãe e devolve só ids de tópicos.
// A IA (Gemini, plano gratuito) nunca escreve o texto que a mãe lê: ela só aponta quais respostas
// já escritas o bot deve mostrar. A chave fica na variável de ambiente GEMINI_API_KEY, nunca no navegador.
// O texto da mãe não é gravado: não há log do conteúdo.

import { GoogleGenAI } from '@google/genai';
import { TOPICOS, IDS, ACOLHIMENTOS } from './_topicos.js';

const TIPOS = ['duvida', 'cumprimento', 'fora_do_escopo'];
const CONTEXTOS = ['gravida', 'pos', 'desconhecido'];
const ACOLHE_IDS = Object.keys(ACOLHIMENTOS);

const MODELO = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
const MAX_CHARS = 400;
const MAX_HISTORICO = 6;
const ORIGENS = ['https://uxpalu.github.io'];

const SCHEMA = {
  type: 'object',
  properties: {
    tipo: { type: 'string', enum: TIPOS },
    contexto_inferido: { type: 'string', enum: CONTEXTOS },
    acolhimento: { type: 'string', enum: ACOLHE_IDS },
    topicos: {
      type: 'array',
      maxItems: 3,
      items: {
        type: 'object',
        properties: {
          topico: { type: 'string', enum: IDS },
          confianca: { type: 'string', enum: ['alta', 'media', 'baixa'] }
        },
        required: ['topico', 'confianca']
      }
    }
  },
  required: ['tipo', 'contexto_inferido', 'acolhimento', 'topicos']
};

const SYSTEM = `Você classifica mensagens enviadas ao Maré, um bot de WhatsApp de apoio à maternidade para mães de baixa renda que usam o SUS.

Sua única tarefa é dizer quais tópicos da lista abaixo respondem à ÚLTIMA mensagem da mãe. Você não escreve resposta: o bot mostra textos já prontos, revisados a partir de fontes oficiais. Escolher um tópico errado é pior do que admitir que não sabe.

As mães escrevem como falam: gírias, erros de digitação, sem pontuação, "neném" para bebê, "posto" para UBS, "peito" para seio.

Tópicos (id: quando usar):
${Object.entries(TOPICOS).map(([id, d]) => `- ${id}: ${d}`).join('\n')}

Além dos tópicos, você devolve três campos:

tipo:
- duvida: ela pergunta ou conta algo sobre gravidez, parto, pós-parto, o neném, direitos, benefícios ou como se sente.
- cumprimento: só um "oi", "bom dia", "obrigada", sem dúvida.
- fora_do_escopo: assunto que não tem a ver com maternidade (ex.: celular, futebol, receita de bolo).

contexto_inferido (se ela está grávida ou já teve o bebê, deduzido da conversa):
- gravida: fala de semanas de gestação, barriga, parto que ainda vai acontecer, pré-natal.
- pos: fala do neném já nascido (idade em dias ou meses, mamar, vacina do bebê), resguardo, pós-parto.
- desconhecido: não dá para saber. Não chute.

acolhimento (uma frase pronta que o bot mostra antes da resposta; escolha só quando a mensagem tem emoção clara):
${Object.entries(ACOLHIMENTOS).map(([id, d]) => `- ${id}: ${d}`).join('\n')}

Regras:
0. Se o tipo é duvida mas nenhum tópico combina com certeza, devolva os 2 ou 3 tópicos mais próximos com confiança baixa. O bot vai perguntar "Seria algum desses?". Use "nenhum" só para cumprimento e fora_do_escopo.
1. Se a mensagem tem mais de uma dúvida (ex.: "meu peito tá rachado e ele chora toda tarde"), devolva um tópico para cada dúvida, na ordem em que aparecem, no máximo 3.
2. Use a conversa anterior só para entender mensagens que dependem dela ("e se durar mais?", "e pro neném?", "e no meu caso?"). Se a última mensagem já é clara sozinha, ignore a conversa anterior. Nunca repita um tópico só porque ele apareceu antes.
3. Confiança:
   - alta: a mensagem pede claramente o que o tópico cobre.
   - media: é o tópico mais provável, mas a mensagem é vaga ou cabe em mais de um.
   - baixa: você está chutando.
4. Para cumprimento e fora_do_escopo, devolva topicos = [{"topico": "nenhum", "confianca": "alta"}].
5. O contexto diz se ela está grávida ou já teve o bebê. Use para desempatar (ex.: "tô com medo" grávida tende a sm_medo_grav; depois do parto, sm_medo_pos).`;

let ai;

export default async function handler(req, res) {
  const origem = req.headers.origin;
  if (origem && (ORIGENS.includes(origem) || /^http:\/\/localhost(:\d+)?$/.test(origem))) {
    res.setHeader('Access-Control-Allow-Origin', origem);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ erro: 'use POST' });

  const { texto, contexto, historico } = req.body || {};
  if (typeof texto !== 'string' || !texto.trim()) return res.status(400).json({ erro: 'texto vazio' });
  if (texto.length > MAX_CHARS) return res.status(400).json({ erro: 'texto longo demais' });
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ erro: 'classificação indisponível' });

  try {
    return res.status(200).json(await classificar(texto.trim(), contexto, historico));
  } catch (e) {
    const status = e?.status === 429 ? 429 : 502;
    console.error('falha na classificação', e?.status ?? '', e?.name ?? ''); // sem o texto da mãe
    return res.status(status).json({ erro: 'classificação indisponível' });
  }
}

// historico: [{ de: 'mae' | 'bot', t: string }] — mensagens da mãe e os NOMES dos tópicos que o bot mostrou.
export async function classificar(texto, contexto, historico = []) {
  ai ??= new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const ctx = contexto === 'pos' ? 'já teve o bebê' : contexto === 'gravida' ? 'está grávida' : 'não informado';

  const anteriores = (Array.isArray(historico) ? historico : [])
    .filter(h => h && (h.de === 'mae' || h.de === 'bot') && typeof h.t === 'string')
    .slice(-MAX_HISTORICO)
    .map(h => `${h.de === 'mae' ? 'Mãe' : 'Bot mostrou o tópico'}: ${h.t.slice(0, 200)}`);

  const prompt = [
    `Contexto: ${ctx}`,
    anteriores.length ? `Conversa anterior:\n${anteriores.join('\n')}` : 'Conversa anterior: nenhuma',
    `ÚLTIMA mensagem da mãe: """${texto}"""`
  ].join('\n\n');

  const pedido = {
    model: MODELO,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM,
      responseMimeType: 'application/json',
      responseJsonSchema: SCHEMA,
      thinkingConfig: { thinkingLevel: 'MINIMAL' } // classificar não precisa de raciocínio longo; responde mais rápido
    }
  };

  // No plano gratuito o Gemini às vezes responde "ocupado" (500/503). Tenta mais uma vez antes de desistir.
  let resposta;
  try {
    resposta = await ai.models.generateContent(pedido);
  } catch (e) {
    if (e?.status !== 500 && e?.status !== 503) throw e;
    await new Promise(r => setTimeout(r, 1200));
    resposta = await ai.models.generateContent(pedido);
  }

  return validar(resposta.text);
}

// Nunca confia cegamente na saída: só passa valor que existe nas listas, sem repetir, no máximo 3 tópicos.
function validar(texto) {
  let dados;
  try { dados = JSON.parse(texto ?? ''); } catch { dados = {}; }
  const vistos = new Set();
  const topicos = (Array.isArray(dados?.topicos) ? dados.topicos : [])
    .filter(t => IDS.includes(t?.topico) && ['alta', 'media', 'baixa'].includes(t?.confianca))
    .filter(t => !vistos.has(t.topico) && vistos.add(t.topico))
    .slice(0, 3);
  return {
    tipo: TIPOS.includes(dados?.tipo) ? dados.tipo : 'duvida',
    contexto_inferido: CONTEXTOS.includes(dados?.contexto_inferido) ? dados.contexto_inferido : 'desconhecido',
    acolhimento: ACOLHE_IDS.includes(dados?.acolhimento) ? dados.acolhimento : 'nenhum',
    topicos
  };
}
