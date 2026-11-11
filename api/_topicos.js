// Tópicos que a IA pode escolher. Cada id é um estado que já existe no bot (objeto F do index.html),
// com resposta escrita a partir das fontes oficiais. A IA só aponta o id; nunca escreve a resposta.
// Arquivo com "_" na frente: a Vercel não transforma em rota.

export const TOPICOS = {
  // Direitos
  d_quando: 'Direitos no SUS em geral, sem dizer se é pré-natal ou parto',
  d_pre: 'Direitos no pré-natal: consultas, acompanhante na consulta, caderneta, faltar ao trabalho, ácido fólico',
  d_parto: 'Direitos na hora do parto: acompanhante (Lei 11.108), analgesia, violência obstétrica, ser respeitada',
  plano_parto: 'O que é plano de parto e como usar',
  d_pos: 'Direitos depois do parto: consulta de revisão, consulta do bebê, anticoncepção, apoio psicológico',
  d_negado: 'Negaram um direito, foi maltratada, quer denunciar ou reclamar',
  d_roteiro: 'O que falar exatamente para exigir o acompanhante no parto',

  // Alertas (só quando é dúvida sobre sinais; emergência descrita é tratada por regra fixa antes da IA)
  alerta_grav: 'Quais são os sinais de perigo na gravidez, quando ir ao hospital estando grávida',
  bebe_alerta: 'Quais são os sinais de perigo no bebê, quando levar ao pronto-socorro',
  bebe_engasgo: 'Como desengasgar o bebê, manobra de engasgo',

  // Amamentação
  amamentacao: 'Amamentação em geral, sem problema específico',
  am_pega: 'Dor ou rachadura/fissura no bico do peito, pega do bebê',
  am_empedrado: 'Seio empedrado, cheio, duro, ingurgitamento',
  am_mastite: 'Mastite, seio vermelho, quente, inflamado, com febre',
  am_leite: 'Acha que o leite é pouco, fraco ou não sustenta',
  am_quanto: 'Até quando amamentar, desmame, aleitamento exclusivo',
  am_banco: 'Banco de leite, doar leite ou receber leite doado',

  // Bebê
  bebe_menu: 'Dúvida sobre o bebê em geral, sem tema específico',
  bebe_colica: 'Cólica, choro no fim da tarde, hora da bruxa',
  bebe_sono: 'Sono do bebê, como colocar para dormir com segurança, dormir junto na cama',
  bebe_ict: 'Icterícia, bebê amarelo, amarelão',
  bebe_umbigo: 'Coto umbilical, umbigo, cuidado com o umbigo, quando cai',
  bebe_vacinas: 'Vacinas do bebê, calendário de vacinação',
  bebe_dev: 'Desenvolvimento do bebê, marcos por mês, quando senta, engatinha, fala',
  bebe_alim: 'Introdução alimentar, papinha, quando começar a comer, BLW',

  // Benefícios
  beneficios: 'Benefícios sociais em geral, que ajuda do governo existe',
  ben_bolsa: 'Bolsa Família, CadÚnico, CRAS, valor extra por gestante ou criança',
  ben_licenca: 'Licença-maternidade, salário-maternidade, INSS, MEI, autônoma, desempregada',
  ben_cegonha: 'Rede Cegonha, programa do SUS para gestante',

  // Saúde mental
  sm_oq: 'Está se sentindo estranha ou mal emocionalmente, sem dizer o quê',
  sm_triste: 'Tristeza, chorando sem motivo, desânimo, sem vontade (sem dizer há quanto tempo)',
  sm_dias: 'Tristeza ou choro há poucos dias, logo depois do parto, baby blues',
  sm_semanas: 'Tristeza que já dura algumas semanas ou mais de 2 semanas',
  sm_mes: 'Tristeza que já dura mais de um mês, ou dificuldade de fazer o básico, depressão pós-parto',
  sm_medo_grav: 'Medo do parto, medo de sentir dor ou de dar errado no parto',
  sm_medo_pos: 'Medo de não dar conta do bebê, de não ser boa mãe',
  sm_esgotada: 'Cansaço extremo, esgotamento, sobrecarga (depois do parto)',
  sm_ansiedade: 'Ansiedade, nervosismo, preocupação demais durante a gravidez',
  sm_onde_ajuda: 'Onde achar psicólogo, CAPS ou apoio emocional de graça pelo SUS',
  sm_sozinha: 'Solidão, se sente sozinha, ninguém ajuda',
  sm_sono: 'Insônia da mãe: não consegue dormir mesmo quando o bebê dorme',
  sm_como_pedir: 'Como pedir ajuda psicológica no posto, quer falar com alguém',

  // Gravidez e parto (v5.1)
  grav_menu: 'Dúvida sobre a gravidez ou o parto em geral, sem tema específico',
  pre_inicio: 'Quando começar o pré-natal, quantas consultas são, onde fazer, o que levar na primeira',
  vac_gest: 'Vacinas da gestante: dTpa, gripe, COVID, VSR, hepatite B na gravidez',
  alim_grav: 'O que comer ou evitar na gravidez: comida, peixe, queijo, ovo, bebida alcoólica',
  pre_eclampsia: 'Pré-eclâmpsia, pressão alta na gravidez (dúvida sobre o que é)',
  parto_sinais: 'Como saber se é trabalho de parto de verdade, contrações, falso parto, quando ir pra maternidade',
  parto_mala: 'O que levar pra maternidade, mala, bolsa, documentos',
  parto_etapas: 'Como é o trabalho de parto, fases, dilatação, placenta',
  d_violencia_obst: 'Violência obstétrica: o que é, exemplos (corte, cesárea forçada, empurrar a barriga), como denunciar',

  // Pós-parto da mãe (v5.1)
  pos_menu: 'Dúvida sobre o corpo da mãe depois do parto, resguardo, em geral',
  pos_sangramento: 'Sangramento depois do parto, lóquios, quanto tempo dura',
  pos_normal: 'Recuperação do parto normal, ponto, episiotomia, quando voltar a ter relação',
  pos_cesarea: 'Recuperação da cesárea, cicatriz, resguardo, pegar peso',
  pos_anticoncepcao: 'Evitar gravidez depois do parto, anticoncepcional, DIU, quando engravidar de novo, amamentar evita gravidez?',
  pos_trabalho: 'Voltar ao trabalho, estabilidade no emprego, ser demitida depois do parto',

  // Bebê e amamentação (v5.1)
  bebe_testes: 'Teste do pezinho, olhinho, orelhinha, coraçãozinho, linguinha',
  am_quando_nao: 'Quando não pode amamentar: HIV, remédios, galactosemia',

  // Checklists
  ck_sem: 'Exames e consultas do pré-natal, sem dizer o trimestre',
  ck_1t: 'Exames do começo da gravidez, primeiro trimestre, até 13 semanas',
  ck_2t: 'Exames do meio da gravidez, segundo trimestre, 14 a 27 semanas, morfológico, glicose',
  ck_3t: 'Exames do fim da gravidez, terceiro trimestre, 28 semanas ou mais, estreptococo',

  nenhum: 'A mensagem não combina com nenhum tópico acima, é cumprimento, conversa solta ou assunto fora do escopo'
};

export const IDS = Object.keys(TOPICOS);

// Frases de acolhimento: a IA só escolhe o id; o texto está escrito no index.html (objeto ACOLHE).
export const ACOLHIMENTOS = {
  nenhum: 'Pergunta neutra ou só informativa, sem emoção forte. É o padrão.',
  dificil: 'Ela conta uma situação difícil ou dolorosa',
  cansaco: 'Ela diz que está exausta, sobrecarregada, sem aguentar',
  medo: 'Ela diz que está com medo ou insegura',
  preocupacao: 'Ela está preocupada com o neném ou com a própria saúde',
  injustica: 'Ela foi maltratada, desrespeitada ou teve um direito negado',
  sozinha: 'Ela diz que está sozinha, sem apoio, sem ninguém'
};
