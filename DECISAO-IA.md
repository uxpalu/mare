# Decisão de design: a IA entende a pergunta, nunca escreve a resposta

Maré v5 · novembro de 2026

## O problema

A v3 testou texto livre e foi revertida: obrigar a mãe a escrever aumentava o esforço numa hora de cansaço e medo. Mas só botões também têm um limite. Quem já sabe o que quer perguntar ("posso levar minha mãe no parto?") precisa atravessar dois ou três menus até achar a resposta, e uma dúvida dupla ("meu peito tá rachado e ele chora toda tarde") vira dois caminhos separados.

## A decisão

O texto livre volta como **opção**, não como caminho principal. Os botões continuam ali o tempo todo.

Quando a mãe escreve, três coisas acontecem, nesta ordem:

1. **Regra fixa de emergência, sem IA** (`emergencia.js`). Se a mensagem tem sinais de perigo (sangramento, bebê que parou de mexer, falta de ar, febre no bebê, pensamento de se machucar, violência em casa), o bot mostra na hora o alerta já escrito, com SAMU 192, CVV 188 ou Central da Mulher 180. Roda no celular, funciona sem internet e não depende de nenhum modelo.
2. **A IA escolhe os tópicos** (`api/classificar.js`). O modelo (Gemini 3.5 Flash-Lite) recebe a mensagem e devolve até 3 dos 44 estados que já existem no bot, cada um com uma confiança (alta, média ou baixa). O formato da saída é travado por um schema JSON, e a função ainda descarta qualquer id que não exista.
3. **O bot mostra o texto já escrito** de cada estado, que veio da base de conhecimento com 18 fontes oficiais. A IA não escreve nenhuma palavra que a mãe lê.

| Confiança | O que o bot faz |
|---|---|
| Alta | Mostra a resposta direto |
| Média | Pergunta "Você quer saber sobre Amamentação › Fissura?" com Sim/Não |
| Baixa, ou nenhum tópico | "Não entendi direito" e volta para os botões |
| Erro de rede ou API fora | "Agora não consegui ler mensagem escrita" e volta para os botões |

## Conversa melhor, sem a IA escrever

Duas melhorias deixam a conversa mais natural sem mudar a regra acima:

- **Várias perguntas numa mensagem.** "Meu peito tá rachado e ele chora toda tarde" mostra a resposta de fissura e, em seguida, a de cólica, com um "Vou por partes 💙" antes.
- **Memória curta.** A IA recebe as últimas mensagens da mãe e os **nomes** dos tópicos que o bot mostrou (nunca o texto de saúde). Assim, "já faz um mês", logo depois de o bot perguntar "faz quanto tempo que você tá assim?", vai direto para o estado de tristeza há mais de um mês. O prompt manda ignorar a memória quando a nova mensagem já é clara sozinha, para um assunto antigo não contaminar o novo.

## Por que a IA só classifica

- **Conteúdo de saúde precisa de fonte.** Um modelo que gera texto pode errar dose, prazo ou sinal de alerta com toda a confiança. Aqui, o pior erro possível é mostrar o tópico errado, e as confianças média e baixa amortecem até isso.
- **Emergência não pode depender de probabilidade.** Por isso ela é regra fixa, revisável linha por linha por uma enfermeira, e roda antes da IA. Na dúvida, a regra prefere alarmar a deixar passar. Quando o alarme é falso, a mãe toca em "Não é urgente, só tenho uma dúvida" e segue.
- **Revisão clínica fica possível.** A enfermeira obstétrica revisa um conjunto fechado de textos e uma lista de palavras-chave, não um gerador.
- **Respeita o aprendizado da v3.** Ninguém é obrigado a escrever.
- **Troca de modelo sem risco.** Como a IA só devolve ids, trocar de fornecedor (Gemini, Claude, um modelo local) não muda nada do que a mãe lê. O protótipo usa o plano gratuito do Gemini; a avaliação abaixo serve para comparar qualquer outro.

## Privacidade e custo

- A chave da API fica numa função serverless na Vercel. O GitHub Pages é estático e não pode guardar segredo.
- A função não grava o texto da mãe; só registra o tipo de erro quando falha.
- **Ponto aberto:** no plano gratuito do Gemini, o Google pode usar o conteúdo para melhorar os produtos dele. Para o protótipo, testado com frases inventadas, isso é aceitável. Antes de usuárias reais, o Maré precisa de um plano pago sem esse uso (ou de um modelo que rode no próprio aparelho), e isso precisa estar no termo de uso.
- Limite de 400 caracteres por mensagem. Custo do protótipo: zero.

## Como foi testado

- `npm test`: 5 grupos de testes da regra de emergência (risco de vida, violência, sinais na gravidez, sinais no bebê e frases comuns que **não** podem disparar alarme).
- `npm run eval`: 43 frases escritas do jeito que as mães escrevem, com gíria e erro de digitação, incluindo perguntas duplas e frases que só fazem sentido com a conversa anterior. Mede acerto, erro seguro (pediu confirmação ou voltou aos botões) e erro perigoso (tópico errado com confiança alta). Resultado em `eval/resultado.md`.

**Resultado (11/11/2026, Gemini 3.5 Flash-Lite, plano gratuito): 42 de 43 acertos.** Acertou as 3 perguntas duplas e as 5 frases que dependem da conversa anterior. O único erro: "o hospital disse q nao pode acompanhante" foi para *Direitos no parto* em vez de *Direito negado*. O card mostrado diz que o acompanhante é lei e manda ligar no 136 se negarem, então a informação não está errada, mas o caminho ideal era o de direito negado. Mantive como erro na contagem. Na primeira rodada, 2 frases falharam porque o Gemini respondeu "ocupado"; a função agora tenta de novo uma vez antes de devolver a mãe aos botões.

## Limites conhecidos

- Ainda não foi testado com mães. O teste moderado com 5 mães segue sendo o próximo passo.
- As listas de palavras de emergência e os cards novos (emergência no pós-parto, saúde mental, violência) foram tirados da base de conhecimento, mas **ainda precisam de revisão clínica**.
- A memória é curta (últimas 6 falas) e some quando a conversa é reiniciada.
- Próximos passos possíveis: extrair dados da frase ("tô de 25 semanas" → checklist do 2º trimestre) e fazer perguntas de esclarecimento escolhidas de uma lista pronta.
