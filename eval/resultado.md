# Avaliação do classificador do Maré

Rodada em 2026-11-11 · modelo gemini-3.5-flash-lite (plano gratuito) · 76 frases

**73/76 acertos · 0 erros seguros · 2 erros perigosos · 1 falhas da API**

Contexto deduzido (grávida/pós/não dá pra saber): 4/4 · Cumprimento e fora do escopo: 3/3 · Acolhimento na hora certa (e só nela): 6/6

- **Erro seguro**: a IA não acertou, mas o bot pediu confirmação ou voltou para os botões. A mãe nunca recebe resposta errada sem chance de corrigir.
- **Erro perigoso**: a IA mostrou direto um tópico que não tinha a ver.
- ↩︎ = frase que depende da conversa anterior (memória curta).

| Frase | Esperado | IA respondeu | Resultado |
|---|---|---|---|
| posso levar minha mãe no parto? | d_parto ou d_roteiro | d_parto (alta) | acerto |
| o hospital disse q nao pode acompanhante | d_negado ou d_roteiro | d_parto (alta) + d_negado (alta) · acolhe: injustica | ERRO PERIGOSO |
| posso pedir anestesia na hora de ter o neném | d_parto | d_parto (alta) | acerto |
| oq é esse tal de plano de parto | plano_parto | plano_parto (alta) | acerto |
| meu patrão pode descontar o dia da consulta? | d_pre | d_pre (alta) | acerto |
| a enfermeira gritou comigo e me tratou mal | d_negado | d_negado (alta) · acolhe: injustica | acerto |
| tenho direito a consulta depois do parto? | d_pos | d_pos (alta) | acerto |
| quais exames tenho q fazer com 10 semanas | ck_1t | ck_1t (alta) | acerto |
| to de 25 semanas, que exame falta | ck_2t | ck_2t (alta) | acerto |
| exame do estreptococo é quando | ck_3t | ck_3t (alta) | acerto |
| quais os sinais pra eu correr pro hospital | alerta_grav | alerta_grav (alta) | acerto |
| meu bico ta todo rachado doi mt pra dar mama | am_pega | am_pega (alta) · acolhe: dificil | acerto |
| o peito ficou duro e cheio demais | am_empedrado ou am_mastite | am_empedrado (alta) | acerto |
| acho que meu leite é fraco ele chora de fome | am_leite | am_leite (alta) · acolhe: preocupacao | acerto |
| até quando tenho que dar só o peito | am_quanto | am_quanto (alta) | acerto |
| quero doar meu leite onde faço | am_banco | am_banco (alta) | acerto |
| ele chora todo fim de tarde sem parar | bebe_colica | bebe_colica (alta) | acerto |
| posso dormir com ele na minha cama? | bebe_sono | bebe_sono (alta) | acerto |
| meu nenem ta amarelinho | bebe_ict | bebe_ict (alta) · acolhe: preocupacao | acerto |
| o umbigo dele ainda não caiu, passo alcool? | bebe_umbigo | bebe_umbigo (alta) | acerto |
| qual vacina ele toma com 2 meses | bebe_vacinas | bebe_vacinas (alta) | acerto |
| com quantos meses ele começa a sentar | bebe_dev | bebe_dev (alta) | acerto |
| quando posso dar papinha | bebe_alim | bebe_alim (alta) | acerto |
| como faz o cadastro do bolsa familia | ben_bolsa | ben_bolsa (alta) | acerto |
| sou mei tenho direito a licença? | ben_licenca | ben_licenca (alta) | acerto |
| que ajuda do governo eu consigo | beneficios ou ben_bolsa | beneficios (alta) | acerto |
| choro o dia todo e nem sei pq | sm_triste | sm_triste (alta) · acolhe: dificil | acerto |
| tenho pavor de sentir dor no parto | sm_medo_grav | sm_medo_grav (alta) · acolhe: medo | acerto |
| sinto que sou pessima mãe nao dou conta | sm_medo_pos | sm_medo_pos (alta) + sm_esgotada (media) · acolhe: cansaco | acerto |
| to exausta nao aguento mais | sm_esgotada | sm_esgotada (alta) · acolhe: cansaco | acerto |
| me sinto muito sozinha ninguem me ajuda | sm_sozinha | sm_sozinha (alta) · acolhe: sozinha | acerto |
| ele dorme e eu fico acordada sem conseguir dormir | sm_sono | sm_sono (alta) | acerto |
| oi tudo bem? | nenhum | nenhum (alta) · tipo: cumprimento | acerto |
| qual o melhor celular pra comprar | nenhum | nenhum (alta) · tipo: fora_do_escopo | acerto |
| meu marido me bate | nenhum | d_negado (alta) · acolhe: injustica | ERRO PERIGOSO |
| meu peito tá rachado e ele chora toda tarde | am_pega + bebe_colica | am_pega (alta) + bebe_colica (alta) | acerto |
| quando ele toma a vacina e quando começo a papinha? | bebe_vacinas + bebe_alim | bebe_vacinas (alta) + bebe_alim (alta) | acerto |
| como faço o bolsa familia e quanto tempo de licença eu tenho | ben_bolsa + ben_licenca | ben_bolsa (alta) + ben_licenca (alta) | acerto |
| ↩︎ já faz um mês | sm_mes | sm_mes (alta) · acolhe: dificil | acerto |
| ↩︎ e se durar mais de duas semanas? | sm_semanas | sm_semanas (alta) · acolhe: preocupacao | acerto |
| ↩︎ e no terceiro? | ck_3t | ck_3t (alta) | acerto |
| ↩︎ e se tiver febre? | am_mastite | am_mastite (alta) | acerto |
| ↩︎ quais vacinas ele precisa | bebe_vacinas | bebe_vacinas (alta) | acerto |
| tô de 25 semanas, que exame falta? | ck_2t | ck_2t (alta) · contexto: gravida | acerto |
| meu neném de 2 meses não para de chorar de tarde | bebe_colica | bebe_colica (alta) · contexto: pos | acerto |
| quantas consultas de pré-natal eu tenho direito | d_pre ou ck_sem | d_pre (alta) · contexto: gravida | acerto |
| tenho direito ao bolsa familia? | ben_bolsa | ben_bolsa (alta) · contexto: desconhecido | acerto |
| bom dia | nenhum | nenhum (alta) · tipo: cumprimento | acerto |
| to com um problema no peito | am_pega ou am_empedrado ou am_mastite ou amamentacao | amamentacao (media) + am_pega (baixa) · acolhe: preocupacao | acerto |
| to com uma duvida sobre o neném | bebe_menu | bebe_menu (alta) | acerto |
| descobri hoje que to gravida, o que eu faço primeiro? | pre_inicio | pre_inicio (alta) | acerto |
| quantas consultas tem que ir no pré natal | pre_inicio ou d_pre | pre_inicio (alta) | acerto |
| gravida pode tomar vacina da gripe? | vac_gest | vac_gest (alta) | acerto |
| que vacina eu tomo na gravidez | vac_gest | vac_gest (alta) | acerto |
| posso comer sushi gravida | alim_grav | alim_grav (alta) | acerto |
| posso tomar uma cervejinha no final de semana? | alim_grav | alim_grav (alta) | acerto |
| o que é pré eclampsia | pre_eclampsia | pre_eclampsia (alta) | acerto |
| minha pressão ta alta, isso é perigoso na gravidez? | pre_eclampsia ou alerta_grav | pre_eclampsia (alta) · acolhe: preocupacao | acerto |
| como eu sei se ta na hora de ir pra maternidade | parto_sinais | parto_sinais (alta) | acerto |
| to sentindo umas contrações mas param quando eu ando | parto_sinais | parto_sinais (alta) | acerto |
| o que preciso levar na bolsa da maternidade | parto_mala | parto_mala (alta) | acerto |
| como funciona a dilatação | parto_etapas | parto_etapas (alta) | acerto |
| o médico fez um corte lá embaixo sem me avisar | d_violencia_obst, d_negado | erro da API | falhou |
| a enfermeira empurrou minha barriga com força no parto, pode isso? | d_violencia_obst | d_violencia_obst (alta) · acolhe: injustica | acerto |
| ainda to sangrando 3 semanas depois do parto, é normal? | pos_sangramento | pos_sangramento (alta) | acerto |
| quando posso transar de novo depois do parto normal | pos_normal ou pos_cesarea | pos_normal (alta) | acerto |
| meu ponto da cesarea ta doendo, quanto tempo demora pra sarar | pos_cesarea | pos_cesarea (alta) | acerto |
| posso pegar peso depois da cesárea? | pos_cesarea | pos_cesarea (alta) | acerto |
| quem amamenta pode engravidar? | pos_anticoncepcao | pos_anticoncepcao (alta) | acerto |
| qual anticoncepcional posso tomar amamentando | pos_anticoncepcao | pos_anticoncepcao (alta) | acerto |
| a empresa pode me mandar embora quando eu voltar? | pos_trabalho ou ben_licenca | pos_trabalho (alta) | acerto |
| quando faz o teste do pezinho | bebe_testes | bebe_testes (alta) | acerto |
| o neném não fez o teste da orelhinha ainda | bebe_testes | bebe_testes (alta) | acerto |
| tenho hiv posso amamentar? | am_quando_nao | am_quando_nao (alta) | acerto |
| to muito ansiosa com a gravidez | sm_ansiedade ou sm_esgotada | sm_ansiedade (alta) · acolhe: preocupacao | acerto |
| onde consigo psicologo de graça | sm_onde_ajuda ou sm_como_pedir | sm_onde_ajuda (alta) | acerto |
