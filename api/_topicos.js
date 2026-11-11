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
  sm_esgotada: 'Cansaço extremo, esgotamento, ansiedade, sobrecarga',
  sm_sozinha: 'Solidão, se sente sozinha, ninguém ajuda',
  sm_sono: 'Insônia da mãe: não consegue dormir mesmo quando o bebê dorme',
  sm_como_pedir: 'Como pedir ajuda psicológica no posto, quer falar com alguém',

  // Checklists
  ck_sem: 'Exames e consultas do pré-natal, sem dizer o trimestre',
  ck_1t: 'Exames do começo da gravidez, primeiro trimestre, até 13 semanas',
  ck_2t: 'Exames do meio da gravidez, segundo trimestre, 14 a 27 semanas, morfológico, glicose',
  ck_3t: 'Exames do fim da gravidez, terceiro trimestre, 28 semanas ou mais, estreptococo',

  nenhum: 'A mensagem não combina com nenhum tópico acima, é cumprimento, conversa solta ou assunto fora do escopo'
};

export const IDS = Object.keys(TOPICOS);
