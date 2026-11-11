# Avaliação do classificador do Maré

Rodada em 2026-11-11 · modelo gemini-3.5-flash-lite (plano gratuito) · 43 frases

**42/43 acertos · 0 erros seguros · 1 erros perigosos**

- **Erro seguro**: a IA não acertou, mas o bot pediu confirmação ou voltou para os botões. A mãe nunca recebe resposta errada sem chance de corrigir.
- **Erro perigoso**: a IA mostrou direto um tópico que não tinha a ver.
- ↩︎ = frase que depende da conversa anterior (memória curta).

| Frase | Esperado | IA respondeu | Resultado |
|---|---|---|---|
| posso levar minha mãe no parto? | d_parto ou d_roteiro | d_parto (alta) | acerto |
| o hospital disse q nao pode acompanhante | d_negado ou d_roteiro | d_parto (alta) | ERRO PERIGOSO |
| posso pedir anestesia na hora de ter o neném | d_parto | d_parto (alta) | acerto |
| oq é esse tal de plano de parto | plano_parto | plano_parto (alta) | acerto |
| meu patrão pode descontar o dia da consulta? | d_pre | d_pre (alta) | acerto |
| a enfermeira gritou comigo e me tratou mal | d_negado | d_negado (alta) | acerto |
| tenho direito a consulta depois do parto? | d_pos | d_pos (alta) | acerto |
| quais exames tenho q fazer com 10 semanas | ck_1t | ck_1t (alta) | acerto |
| to de 25 semanas, que exame falta | ck_2t | ck_2t (alta) | acerto |
| exame do estreptococo é quando | ck_3t | ck_3t (alta) | acerto |
| quais os sinais pra eu correr pro hospital | alerta_grav | alerta_grav (alta) | acerto |
| meu bico ta todo rachado doi mt pra dar mama | am_pega | am_pega (alta) | acerto |
| o peito ficou duro e cheio demais | am_empedrado ou am_mastite | am_empedrado (alta) | acerto |
| acho que meu leite é fraco ele chora de fome | am_leite | am_leite (alta) | acerto |
| até quando tenho que dar só o peito | am_quanto | am_quanto (alta) | acerto |
| quero doar meu leite onde faço | am_banco | am_banco (alta) | acerto |
| ele chora todo fim de tarde sem parar | bebe_colica | bebe_colica (alta) | acerto |
| posso dormir com ele na minha cama? | bebe_sono | bebe_sono (alta) | acerto |
| meu nenem ta amarelinho | bebe_ict | bebe_ict (alta) | acerto |
| o umbigo dele ainda não caiu, passo alcool? | bebe_umbigo | bebe_umbigo (alta) | acerto |
| qual vacina ele toma com 2 meses | bebe_vacinas | bebe_vacinas (alta) | acerto |
| com quantos meses ele começa a sentar | bebe_dev | bebe_dev (alta) | acerto |
| quando posso dar papinha | bebe_alim | bebe_alim (alta) | acerto |
| como faz o cadastro do bolsa familia | ben_bolsa | ben_bolsa (alta) | acerto |
| sou mei tenho direito a licença? | ben_licenca | ben_licenca (alta) | acerto |
| que ajuda do governo eu consigo | beneficios ou ben_bolsa | beneficios (alta) | acerto |
| choro o dia todo e nem sei pq | sm_triste | sm_triste (alta) | acerto |
| tenho pavor de sentir dor no parto | sm_medo_grav | sm_medo_grav (alta) | acerto |
| sinto que sou pessima mãe nao dou conta | sm_medo_pos | sm_medo_pos (alta) | acerto |
| to exausta nao aguento mais | sm_esgotada | sm_esgotada (alta) | acerto |
| me sinto muito sozinha ninguem me ajuda | sm_sozinha | sm_sozinha (alta) | acerto |
| ele dorme e eu fico acordada sem conseguir dormir | sm_sono | sm_sono (alta) | acerto |
| oi tudo bem? | nenhum | nenhum (alta) | acerto |
| qual o melhor celular pra comprar | nenhum | nenhum (alta) | acerto |
| meu marido me bate | nenhum | nenhum (alta) | acerto |
| meu peito tá rachado e ele chora toda tarde | am_pega + bebe_colica | am_pega (alta) + bebe_colica (alta) | acerto |
| quando ele toma a vacina e quando começo a papinha? | bebe_vacinas + bebe_alim | bebe_vacinas (alta) + bebe_alim (alta) | acerto |
| como faço o bolsa familia e quanto tempo de licença eu tenho | ben_bolsa + ben_licenca | ben_bolsa (alta) + ben_licenca (alta) | acerto |
| ↩︎ já faz um mês | sm_mes | sm_mes (alta) | acerto |
| ↩︎ e se durar mais de duas semanas? | sm_semanas | sm_semanas (alta) | acerto |
| ↩︎ e no terceiro? | ck_3t | ck_3t (alta) | acerto |
| ↩︎ e se tiver febre? | am_mastite | am_mastite (alta) | acerto |
| ↩︎ quais vacinas ele precisa | bebe_vacinas | bebe_vacinas (alta) | acerto |
