// Servidor local para testar o bot com a função /api/classificar, sem precisar da Vercel.
//   npm run dev                         → usa a API real (precisa de ANTHROPIC_API_KEY no ambiente)
//   MARE_FAKE=1 npm run dev             → simulação SEM IA, só para testar a interface
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import handler from '../api/classificar.js';

const PORT = Number(process.env.PORT) || 3456;
const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.png': 'image/png', '.json': 'application/json' };

// Simulação SEM IA: só para ver os caminhos da interface (alta, várias, média, memória, não entendi).
function fake(texto, historico = []) {
  const t = texto.toLowerCase();
  const antes = historico.map(h => h.t).join(' ');
  if (t.includes('acompanhante')) return { topicos: [{ topico: 'd_parto', confianca: 'alta' }] };
  if (t.includes('peito') && t.includes('chora')) return { topicos: [{ topico: 'am_pega', confianca: 'alta' }, { topico: 'bebe_colica', confianca: 'alta' }] };
  if (t.includes('peito')) return { topicos: [{ topico: 'am_pega', confianca: 'media' }] };
  if (t.includes('chorando')) return { topicos: [{ topico: 'sm_triste', confianca: 'alta' }] };
  if (t.includes('mês') && antes.includes('Tristeza')) return { topicos: [{ topico: 'sm_mes', confianca: 'alta' }] };
  return { topicos: [{ topico: 'nenhum', confianca: 'alta' }] };
}

http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/classificar')) {
    let corpo = '';
    for await (const c of req) corpo += c;
    try { req.body = corpo ? JSON.parse(corpo) : {}; } catch { req.body = {}; }
    const shim = {
      status(c) { res.statusCode = c; return shim; },
      setHeader: (k, v) => res.setHeader(k, v),
      json(o) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)); },
      end: () => res.end()
    };
    if (process.env.MARE_FAKE && req.method === 'POST') {
      await new Promise(r => setTimeout(r, 600));
      return shim.status(200).json(fake(req.body.texto || '', req.body.historico));
    }
    return handler(req, shim);
  }
  const caminho = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  const arquivo = join(RAIZ, caminho === '/' ? 'index.html' : caminho);
  try {
    const dados = await readFile(arquivo);
    res.setHeader('Content-Type', TIPOS[extname(arquivo)] || 'application/octet-stream');
    res.end(dados);
  } catch {
    res.statusCode = 404; res.end('não encontrado');
  }
}).listen(PORT, () => console.log(`Maré em http://localhost:${PORT}${process.env.MARE_FAKE ? ' (simulação, sem IA)' : ''}`));
