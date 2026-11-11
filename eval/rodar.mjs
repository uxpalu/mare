// Avaliação do classificador com frases escritas do jeito que as mães escrevem.
// Chama a API de verdade (Gemini no plano gratuito, sem custo). Rodar:
//   npm run eval        (lê a chave de .env.local: GEMINI_API_KEY=...)
//
// O que conta:
//  - acerto: o tópico principal certo (e, quando há duas perguntas, o segundo também)
//  - seguro: não acertou, mas nada errado foi mostrado direto (pediu confirmação ou voltou aos botões)
//  - erro perigoso: mostrou direto (confiança alta) um tópico que não tinha a ver
import { readFile, writeFile } from 'node:fs/promises';
import { classificar } from '../api/classificar.js';

const PAUSA_MS = Number(process.env.EVAL_PAUSA_MS) || 4500; // respeita o limite por minuto do plano gratuito
const casos = JSON.parse(await readFile(new URL('./casos.json', import.meta.url)));
const modelo = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
const linhas = [];
const placar = { acerto: 0, seguro: 0, perigoso: 0, falhou: 0 };
const extra = { contexto: [0, 0], tipo: [0, 0], acolhe: [0, 0] }; // [acertos, total]
const conta = (k, ok) => { extra[k][1]++; if (ok) extra[k][0]++; };

for (const c of casos) {
  let topicos, r;
  try {
    r = await classificar(c.texto, c.contexto, c.historico || []);
    ({ topicos } = r);
  } catch (e) {
    placar.falhou++;
    console.log(`FALHOU        ${c.texto} → erro ${e?.status ?? e?.message}`);
    linhas.push(`| ${c.texto} | ${c.esperado.join(', ')} | erro da API | falhou |`);
    await new Promise(r => setTimeout(r, PAUSA_MS));
    continue;
  }
  const uteis = topicos.filter(t => t.topico !== 'nenhum' && t.confianca !== 'baixa');
  const permitidos = new Set([...c.esperado, ...(c.tambem || [])]);

  let status;
  const esperaNada = c.esperado.includes('nenhum');
  const principalOk = esperaNada ? uteis.length === 0
    : c.aceita_sugestao ? topicos.some(t => c.esperado.includes(t.topico)) // vaga: vale aparecer em "Seria algum desses?"
    : c.esperado.includes(uteis[0]?.topico);
  if (c.contexto_esperado) conta('contexto', r.contexto_inferido === c.contexto_esperado);
  if (c.tipo_esperado) conta('tipo', r.tipo === c.tipo_esperado);
  if (c.acolhe_esperado !== undefined) conta('acolhe', (r.acolhimento !== 'nenhum') === c.acolhe_esperado);
  const tambemOk = (c.tambem || []).every(id => uteis.some(t => t.topico === id));
  if (principalOk && tambemOk) status = 'acerto';
  else if (uteis.some(t => t.confianca === 'alta' && !permitidos.has(t.topico))) status = 'ERRO PERIGOSO';
  else status = 'seguro';
  placar[status === 'ERRO PERIGOSO' ? 'perigoso' : status]++;

  const resposta = (topicos.map(t => `${t.topico} (${t.confianca})`).join(' + ') || '(vazio)') +
    (c.contexto_esperado ? ` · contexto: ${r.contexto_inferido}` : '') +
    (c.tipo_esperado ? ` · tipo: ${r.tipo}` : '') +
    (r.acolhimento !== 'nenhum' ? ` · acolhe: ${r.acolhimento}` : '');
  const esperado = c.esperado.join(' ou ') + (c.tambem ? ` + ${c.tambem.join(' + ')}` : '');
  console.log(`${status.padEnd(13)} ${c.texto} → ${resposta}`);
  linhas.push(`| ${c.historico ? '↩︎ ' : ''}${c.texto} | ${esperado} | ${resposta} | ${status} |`);
  await new Promise(r => setTimeout(r, PAUSA_MS));
}

const total = casos.length;
const resumo = `${placar.acerto}/${total} acertos · ${placar.seguro} erros seguros · ${placar.perigoso} erros perigosos` +
  (placar.falhou ? ` · ${placar.falhou} falhas da API` : '');
const extras = `Contexto deduzido (grávida/pós/não dá pra saber): ${extra.contexto[0]}/${extra.contexto[1]} · ` +
  `Cumprimento e fora do escopo: ${extra.tipo[0]}/${extra.tipo[1]} · ` +
  `Acolhimento na hora certa (e só nela): ${extra.acolhe[0]}/${extra.acolhe[1]}`;
console.log('\n' + resumo + '\n' + extras);

await writeFile(new URL('./resultado.md', import.meta.url),
`# Avaliação do classificador do Maré

Rodada em ${new Date().toISOString().slice(0, 10)} · modelo ${modelo} (plano gratuito) · ${total} frases

**${resumo}**

${extras}

- **Erro seguro**: a IA não acertou, mas o bot pediu confirmação ou voltou para os botões. A mãe nunca recebe resposta errada sem chance de corrigir.
- **Erro perigoso**: a IA mostrou direto um tópico que não tinha a ver.
- ↩︎ = frase que depende da conversa anterior (memória curta).

| Frase | Esperado | IA respondeu | Resultado |
|---|---|---|---|
${linhas.join('\n')}
`);
