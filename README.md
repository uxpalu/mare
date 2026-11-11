# Maré — Bot de Apoio à Maternidade

**Protótipo interativo de UX** · Estudo de caso de portfólio

---

## Visão geral

O **Maré** é um bot de WhatsApp gratuito que apoia mães de baixa renda durante a gestação e o pós-parto — com informação sobre direitos no SUS, saúde mental, amamentação, cuidados com o bebê e benefícios sociais.

Este repositório contém o **protótipo interativo** desenvolvido como estudo de caso de UX Research, incluindo base de conhecimento, copy revisada e roteiro de teste de usabilidade.

---

## Problema

Mães de baixa renda no Brasil enfrentam três barreiras críticas:

1. **Desinformação** — não conhecem seus direitos no SUS nem os benefícios sociais disponíveis
2. **Isolamento emocional** — depressão pós-parto afeta 1 em cada 4 mães brasileiras, mas o tema ainda é tabu
3. **Acesso** — aplicativos de saúde exigem internet rápida, smartphone top e cadastros complexos

---

## Solução

Bot por WhatsApp — canal que 92% das mães de baixa renda já usam, sem precisar instalar nada.

**8 módulos de conteúdo:**

| Módulo | Conteúdo |
|---|---|
| Direitos no SUS | Pré-natal, parto, pós-parto, violência obstétrica |
| Sinais de alerta | Gravidez e bebê — quando ir ao hospital agora |
| Saúde mental | Baby blues, DPP, psicose puerperal, CVV 188 |
| Amamentação | Pega, fissura, mastite, leite insuficiente, banco de leite |
| Bebê (0–12 meses) | Cólica, sono seguro, vacinas, desenvolvimento, introdução alimentar |
| Benefícios sociais | Bolsa Família, licença-maternidade, Rede Cegonha |
| Checklists | Exames e vacinas por trimestre |
| Plano de parto | O que é, como usar no SUS |

---

## Processo de UX (Double Diamond)

```
DISCOVER → DEFINE → DEVELOP → DELIVER
```

### Discover
- Netnografia em 12 canais (grupos de mães, fóruns, comunidades WhatsApp)
- Survey com 9 respondentes
- Base de conhecimento: 18 pesquisas em fontes oficiais (MS, FIOCRUZ, OMS, CFM)

### Define
- Business Model Canvas v3 (ajustado pós-netnografia)
- Público: mãe, 18–35 anos, periferias urbanas, usuária SUS, Android
- Problem statement: acesso a informação confiável de forma acessível e acolhedora

### Develop
- Arquitetura: máquina de estados contextual com variável `userCtx: 'gravida' | 'pos'`
- Evolução: v1 (linear) → v2 (contextual) → v4 (55+ estados, 8 módulos)
- Copy revisada por especialista: voz de amiga, não de instituição

### Deliver *(próximos passos)*
- Teste de usabilidade com 5 mães (roteiro incluído em `/research`)
- Validação com profissional de saúde (enfermeira obstétrica)
- Publicação via Typebot + WhatsApp Business API

---

## Arquitetura técnica do protótipo

```
index.html
├── Máquina de estados (objeto F com ~55 estados)
├── Cards de conteúdo (objeto C — PARTO, ALERTA_GRAV, VACINAS_BEBE...)
├── Contexto da usuária (uCtx: 'gravida' | 'pos')
├── Renderização progressiva com delay (simula digitação)
└── Alertas visuais (amber) para estados de emergência
```

**Sem dependências externas.** HTML/CSS/JS puro — roda offline.

---

## Como rodar

```bash
# Clone o repositório
git clone https://github.com/uxpalu/mare.git
cd mare

# Abra no navegador
open index.html
# ou
npx serve .
```

Ou acesse direto: **[uxpalu.github.io/mare](https://uxpalu.github.io/mare)**

---

## Arquivos

```
mare/
├── index.html                    ← Protótipo interativo (bot v4)
├── research/
│   ├── base-conhecimento.md      ← Base de conhecimento clínica (9 módulos)
│   ├── roteiro-revisado.md       ← Copy revisada (antes/depois)
│   └── roteiro-teste-usabilidade.md ← Roteiro de teste com 5 tarefas
└── README.md
```

---

## Decisões de design

**Por que WhatsApp e não app nativo?**
A netnografia revelou que 92% das mães de baixa renda usam WhatsApp diariamente e têm resistência a instalar novos aplicativos. O bot elimina a barreira de adoção.

**Por que botões e não texto livre?**
Teste de conceito mostrou que texto livre aumenta a carga cognitiva em momentos de vulnerabilidade. Botões guiam sem sobrecarregar.

**v5: texto livre como opção, com IA que só classifica**
Os botões continuam sendo o caminho principal. Quem prefere escrever pode digitar a dúvida: uma regra fixa checa primeiro se é emergência (sem IA), depois a IA (Gemini) escolhe um ou mais dos 44 estados existentes, lembrando o assunto das últimas mensagens, e o bot mostra a resposta já escrita a partir das fontes oficiais. A IA nunca escreve texto de saúde. Detalhes em [DECISAO-IA.md](DECISAO-IA.md).

```
api/classificar.js   ← função serverless (Vercel), guarda a chave da API
api/_topicos.js      ← os 44 tópicos que a IA pode escolher
emergencia.js        ← regra fixa de emergência (roda no navegador, sem IA)
eval/                ← testes da regra (npm test) e avaliação da IA (npm run eval)
```

**Por que "neném" e não "bebê"?**
Copy alinhada ao vocabulário real do público — descoberto via netnografia. "Posto" em vez de "UBS", "tá" em vez de "está". Cada palavra foi validada.

---

## Modelo de negócio

**Gratuito para a usuária final.** Receita B2B via parcerias com prefeituras, secretarias de saúde e editais de impacto social.

---

## Sobre

Projeto de UX Research desenvolvido por **Paulo Cesar** · [palu.design](https://palu.design)

Contato: uxpalu@gmail.com
