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

for (const c of casos) {
  let topicos;
  try {
    ({ topicos } = await classificar(c.texto, c.contexto, c.historico || []));
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
  const principalOk = esperaNada ? uteis.length === 0 : c.esperado.includes(uteis[0]?.topico);
  const tambemOk = (c.tambem || []).every(id => uteis.some(t => t.topico === id));
  if (principalOk && tambemOk) status = 'acerto';
  else if (uteis.some(t => t.confianca === 'alta' && !permitidos.has(t.topico))) status = 'ERRO PERIGOSO';
  else status = 'seguro';
  placar[status === 'ERRO PERIGOSO' ? 'perigoso' : status]++;

  const resposta = topicos.map(t => `${t.topico} (${t.confianca})`).join(' + ') || '(vazio)';
  const esperado = c.esperado.join(' ou ') + (c.tambem ? ` + ${c.tambem.join(' + ')}` : '');
  console.log(`${status.padEnd(13)} ${c.texto} → ${resposta}`);
  linhas.push(`| ${c.historico ? '↩︎ ' : ''}${c.texto} | ${esperado} | ${resposta} | ${status} |`);
  await new Promise(r => setTimeout(r, PAUSA_MS));
}

const total = casos.length;
const resumo = `${placar.acerto}/${total} acertos · ${placar.seguro} erros seguros · ${placar.perigoso} erros perigosos` +
  (placar.falhou ? ` · ${placar.falhou} falhas da API` : '');
console.log('\n' + resumo);

await writeFile(new URL('./resultado.md', import.meta.url),
`# Avaliação do classificador do Maré

Rodada em ${new Date().toISOString().slice(0, 10)} · modelo ${modelo} (plano gratuito) · ${total} frases

**${resumo}**

- **Erro seguro**: a IA não acertou, mas o bot pediu confirmação ou voltou para os botões. A mãe nunca recebe resposta errada sem chance de corrigir.
- **Erro perigoso**: a IA mostrou direto um tópico que não tinha a ver.
- ↩︎ = frase que depende da conversa anterior (memória curta).

| Frase | Esperado | IA respondeu | Resultado |
|---|---|---|---|
${linhas.join('\n')}
`);
