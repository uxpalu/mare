# Maré — Case Study de UX
## Relatório de Processo para Portfólio

**Projeto:** Maré — Bot de apoio à maternidade via WhatsApp  
**Papel:** UX Researcher + Interaction Designer (solo)  
**Duração:** 6 semanas  
**Método:** Double Diamond · Netnografia · Survey · Prototipagem iterativa · Teste de usabilidade  
**Status:** Protótipo v4 validado · Pronto para teste com usuárias reais

---

## Resumo Executivo

> Mães de baixa renda no Brasil têm acesso formal ao SUS — mas não têm acesso real à informação sobre seus direitos, saúde mental e cuidados com o bebê. Criei o Maré para fechar essa lacuna onde essas mães já estão: o WhatsApp.

**Resultado do processo:**
- 55+ estados de conversa cobrindo toda a jornada gestação → pós-parto
- 8 módulos de conteúdo baseados em fontes oficiais (MS, FIOCRUZ, OMS)
- Copy validada por método netnográfico e revisada por especialista em copy
- Protótipo interativo publicado e testável

**Impacto potencial:** 2,8 milhões de partos/ano no SUS; 25% das mães com DPP sem diagnóstico.

---

## 1. O Problema

### Contexto

O Brasil tem cobertura universal de saúde no papel. Na prática, mães de baixa renda enfrentam:

- **Violência obstétrica** — 1 em cada 4 mães brasileiras relata alguma forma durante o parto (Fundação Perseu Abramo, 2010)
- **DPP não diagnosticada** — 25% das mães; estigma impede busca por ajuda
- **Desinformação sobre direitos** — maioria não sabe que pode ter acompanhante no parto (Lei 11.108/2005) ou pedir analgesia
- **Barreira de acesso digital** — apps de saúde pressupõem internet rápida, smartphone top, tempo e literacia digital que esse público não tem

### Por que isso importa agora

Em 2025, o Brasil registrou aumento nos índices de mortalidade materna evitável. Grande parte associada a pré-eclâmpsia e hemorragia — condições onde informação precoce salva vidas.

### Como o problema chegou até mim

A hipótese inicial nasceu de uma observação: grupos de mães no WhatsApp são extremamente ativos, cheios de dúvidas sobre saúde — e cheios de informação errada sendo compartilhada. Onde estão as fontes confiáveis formatadas para esse contexto?

---

## 2. Restrições e Escolhas

### O que eu não podia fazer

Entrevistas diretas com o público-alvo não foram possíveis — sem acesso a redes de ACS ou UBS nesta fase. Essa restrição moldou toda a estratégia de pesquisa.

### Como contornei

**Netnografia** como método substituto: observação sistemática de comportamento real em ambiente digital onde o público já está. Mais ecológica que entrevistas laboratoriais para esse perfil.

---

## 3. Pesquisa — Discover

### 3.1 Netnografia (principal)

**O que fiz:** Análise de 12 fontes digitais onde mães de baixa renda se expressam naturalmente — grupos de WhatsApp (via prints públicos), comunidades Reddit, fóruns gestantes, comentários em vídeos do YouTube, grupos fechados do Facebook.

**Critério de seleção das fontes:** presença confirmada de mães de baixa renda, linguagem informal, discussões espontâneas (não mediadas por profissional).

**O que encontrei:**

| Tema | Frequência | Exemplo real |
|---|---|---|
| Medo do parto | Muito alta | "Elas me xingaram enquanto eu tava em trabalho de parto" |
| DPP não reconhecida | Alta | "Achei que era frescura minha, só depois fui entender" |
| Desinformação sobre direitos | Alta | "Não sabia que podia levar minha mãe pro parto" |
| Amamentação com dor | Muito alta | "Desisti porque ninguém me explicou direito" |
| Isolamento pós-parto | Alta | "Me sinto sozinha mesmo com gente em casa" |
| Busca por informação no WhatsApp | Muito alta | "Mando no grupo e vejo o que as meninas falam" |

**Insight central da netnografia:**
> A mãe não quer um app de saúde. Ela quer alguém de confiança que fale a língua dela, no canal que ela já usa, sem julgamento.

### 3.2 Survey (complementar)

**N:** 9 respondentes  
**Limitação crítica:** amostra tendenciosa — mães com escolaridade superior e acesso digital facilitado. **Não representa o público-alvo.**

**O que aprendemos mesmo assim:**
- 89% relataram dificuldade em encontrar informação confiável sobre amamentação
- 78% não conheciam todos os seus direitos no parto antes de pesquisar
- 100% usam WhatsApp como principal canal de busca informal de informação de saúde

**Decisão tomada:** usar survey apenas como dado de suporte qualitativo, não como base quantitativa para o design.

### 3.3 Base de Conhecimento Clínica

18 pesquisas em fontes oficiais para garantir que o bot não teria lacunas de conteúdo:

- Ministério da Saúde (Rede Cegonha, calendário vacinal 2025)
- FIOCRUZ (banco de leite, saúde mental perinatal)
- CFM (resolução violência obstétrica)
- OMS (aleitamento materno, desenvolvimento infantil)
- Legislação: Lei 11.108/2005, Lei 14.737/2023, Lei 14.721/2023

**Resultado:** 9 módulos, 60+ tópicos. Zero estados sem conteúdo.

---

## 4. Definição — Define

### Problem Statement

> Mães de baixa renda no Brasil precisam de acesso a informação confiável sobre saúde materna de forma acolhedora e sem barreiras — porque o sistema atual ou não chega até elas, ou chega de forma intimidante, técnica e sem empatia.

### Persona de Pesquisa

**Não é uma persona genérica** — foi construída a partir da netnografia.

**Mariana, 24 anos, Duque de Caxias (RJ)**
- Primeira gravidez, 7 meses
- Smartphone Android, plano de dados limitado
- WhatsApp é sua principal fonte de informação
- Não confia em "site de médico" — linguagem difícil
- Medo do parto, mas não quer parecer "frescurenta"
- Família próxima mas sem experiência recente de parto

**O que Mariana precisa:**
1. Saber o que é normal vs. sinal de alerta
2. Conhecer seus direitos antes de precisar deles
3. Ter alguém que "fale como ela" sem julgamento

### Decisão de canal

**Por que WhatsApp e não app nativo:**

| Critério | App nativo | WhatsApp bot |
|---|---|---|
| Instalação | Requer espaço, dados, decisão | Já instalado, link basta |
| Confiança | "Quem é essa empresa?" | Canal familiar, íntimo |
| Dados móveis | Carregamento de app | Texto leve, offline-friendly |
| Recorrência | Notificações ignoradas | Conversa integrada ao dia |

---

## 5. Prototipagem — Develop

### Evolução do protótipo

**v1 — Linear**
Fluxo único para todas as usuárias. Problema: pós-parto recebia "medo do parto" como opção. Erro grave de contexto.

**v2 — Contextual**
Introdução da variável `uCtx: 'gravida' | 'pos'`. Menu e opções passam a ser funções do contexto. Resolveu o bug de contexto.

**v3 — Texto livre (rejeitado)**
Tentativa de tornar a conversa mais fluida com input de texto. Feedback do processo: aumentava carga cognitiva em momento vulnerável. Revertido ao modelo de botões.

> *"Botões não são limitação — são alívio cognitivo quando você está exausta ou assustada."*

**v4 — Expandido (atual)**
55+ estados · 8 módulos · Cards de alerta visual · Copy revisada por especialista

### Decisões de design notáveis

**1. Alertas visuais amber para emergências**
Estados como `ALERTA_GRAV` e `ALERTA_BEBE` usam bubble âmbar com borda laranja. Diferença visual imediata sem depender de leitura completa.

**2. Delay progressivo nas mensagens**
Cada bubble aparece com 300ms de intervalo — simula digitação humana, reduz sensação de "dump de texto".

**3. Copy: voz de amiga, não de instituição**
"posto" em vez de "UBS", "neném" em vez de "bebê", "tá" em vez de "está". Cada palavra foi validada contra o vocabulário encontrado na netnografia.

**4. Nenhuma dependência externa**
HTML/CSS/JS puro. Funciona offline, carrega em menos de 1 segundo em conexão lenta.

### Arquitetura técnica

```
Máquina de estados com contexto
├── uCtx: 'gravida' | 'pos'       → controla menu e sub-fluxos
├── F{}: ~55 estados               → cada estado tem msgs[] e opts[]
├── C{}: 8 cards de conteúdo       → PARTO, ALERTA_GRAV, VACINAS_BEBE...
├── gm(id): resolve msgs           → suporta função ou array
└── go(id): resolve opts           → suporta função ou array
```

---

## 6. Validação — Deliver (próximos passos)

### O que já existe para teste

Roteiro de usabilidade moderado com:
- 5 tarefas com cenário realista
- Critérios de sucesso objetivos por tarefa
- Perguntas pós-sessão sobre linguagem e confiança
- Perfil de recrutamento (mães, SUS, Android, não-tech)
- Mensagem de recrutamento pronta

### O que está pendente

| Etapa | Status | Bloqueio |
|---|---|---|
| Teste com 5 mães reais | Pendente | Acesso ao público via ACS/UBS |
| Revisão por profissional de saúde | Pendente | Parceria com enfermeira obstétrica |
| Publicação em plataforma real | Pendente | WhatsApp Business API |

### O que farei com os resultados do teste

1. Tabela de achados com severidade (🔴🟡🟢)
2. Iteração em estados com maior abandono
3. Ajuste de copy onde linguagem gerar estranhamento
4. NPS simplificado: "de 0 a 10, indicaria para uma amiga grávida?"

---

## 7. Reflexão e Aprendizados

### O que funcionou

- **Netnografia como substituto de entrevistas** — revelou padrões comportamentais que entrevistas formais dificilmente captariam (contexto natural, linguagem real)
- **Restrição de botões** — a tentação de "texto livre = mais natural" foi testada e descartada com evidência
- **Base de conhecimento antes de prototipar** — garantiu que nenhum fluxo terminasse sem resposta

### O que eu faria diferente

- Recrutaria ao menos 3 mães reais via ACS **antes** de iniciar o protótipo, mesmo sem roteiro formal — observação vale mais que hipótese
- Testaria a copy antes da arquitetura — a revisão de linguagem revelou padrões que teriam mudado os próprios estados

### Tensão não resolvida

> O Maré foi construído com base em dados de públicos próximos ao real, mas não idênticos. O maior risco de design é o gap entre o que a netnografia revelou e o que uma mãe de periferia com acesso de 3G realmente entende e usa.

Esse gap só fecha com teste real. É o próximo passo.

---

## 8. Entregas do Projeto

| Artefato | Localização |
|---|---|
| Protótipo interativo (bot v4) | [uxpalu.github.io/mare](https://uxpalu.github.io/mare) |
| Repositório GitHub | [github.com/uxpalu/mare](https://github.com/uxpalu/mare) |
| Base de conhecimento clínica | `research/base-conhecimento.md` |
| Copy revisada (antes/depois) | `research/roteiro-revisado.md` |
| Roteiro de teste de usabilidade | `research/roteiro-teste-usabilidade.md` |
| Journey map da mãe | `ux-research/mare/jornada.md` |
| Este relatório | `ux-research/mare/relatorio.md` |

---

*Paulo César · palu.design · uxpalu@gmail.com*  
*UX Research + Interaction Design · Rio de Janeiro*
