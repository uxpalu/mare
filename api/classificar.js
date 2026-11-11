// Função serverless (Vercel) que recebe a mensagem livre da mãe e devolve só ids de tópicos.
// A IA (Gemini, plano gratuito) nunca escreve o texto que a mãe lê: ela só aponta quais respostas
// já escritas o bot deve mostrar. A chave fica na variável de ambiente GEMINI_API_KEY, nunca no navegador.
// O texto da mãe não é gravado: não há log do conteúdo.

import { GoogleGenAI } from '@google/genai';
import { TOPICOS, IDS } from './_topicos.js';

const MODELO = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
const MAX_CHARS = 400;
const MAX_HISTORICO = 6;
const ORIGENS = ['https://uxpalu.github.io'];

const SCHEMA = {
  type: 'object',
  properties: {
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
  required: ['topicos']
};

const SYSTEM = `Você classifica mensagens enviadas ao Maré, um bot de WhatsApp de apoio à maternidade para mães de baixa renda que usam o SUS.

Sua única tarefa é dizer quais tópicos da lista abaixo respondem à ÚLTIMA mensagem da mãe. Você não escreve resposta: o bot mostra textos já prontos, revisados a partir de fontes oficiais. Escolher um tópico errado é pior do que admitir que não sabe.

As mães escrevem como falam: gírias, erros de digitação, sem pontuação, "neném" para bebê, "posto" para UBS, "peito" para seio.

Tópicos (id: quando usar):
${Object.entries(TOPICOS).map(([id, d]) => `- ${id}: ${d}`).join('\n')}

Regras:
1. Se a mensagem tem mais de uma dúvida (ex.: "meu peito tá rachado e ele chora toda tarde"), devolva um tópico para cada dúvida, na ordem em que aparecem, no máximo 3.
2. Use a conversa anterior só para entender mensagens que dependem dela ("e se durar mais?", "e pro neném?", "e no meu caso?"). Se a última mensagem já é clara sozinha, ignore a conversa anterior. Nunca repita um tópico só porque ele apareceu antes.
3. Confiança:
   - alta: a mensagem pede claramente o que o tópico cobre.
   - media: é o tópico mais provável, mas a mensagem é vaga ou cabe em mais de um.
   - baixa: você está chutando.
4. Se nada combina, devolva [{"topico": "nenhum", "confianca": "alta"}].
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
      responseJsonSchema: SCHEMA
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

  return { topicos: validar(resposta.text) };
}

// Nunca confia cegamente na saída: só passa id que existe, sem repetir, no máximo 3.
function validar(texto) {
  let dados;
  try { dados = JSON.parse(texto ?? ''); } catch { return []; }
  const vistos = new Set();
  return (Array.isArray(dados?.topicos) ? dados.topicos : [])
    .filter(t => IDS.includes(t?.topico) && ['alta', 'media', 'baixa'].includes(t?.confianca))
    .filter(t => !vistos.has(t.topico) && vistos.add(t.topico))
    .slice(0, 3);
}
