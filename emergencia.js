// Regra fixa de emergência. Roda no navegador ANTES de qualquer chamada à IA e funciona sem internet.
// A IA nunca decide se é emergência: se alguma expressão abaixo aparece, o bot mostra o alerta direto.
// Lista revisável por profissional de saúde. Na dúvida, a regra prefere alarmar a deixar passar.

(function () {
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ');

  // Risco à vida da mãe ou de outra pessoa: vai para CVV 188 + SAMU 192.
  const MENTAL = [
    /\b(me matar|matar (eu|a mim)|tirar (a )?minha (propria )?vida|suicid|acabar com (a )?minha vida|nao quero mais viver|quero morrer|vontade de morrer)/,
    /\b(machucar|fazer mal|matar|jogar|sacudir) (o |a |meu |minha )?(bebe|nene|filh[oa]|crianca)/,
    /\b(ouvindo vozes|ouco vozes|vozes mandando)/
  ];

  // Violência doméstica: vai para Central da Mulher 180 + 190.
  const VIOLENCIA = /\b(me bate|me bateu|me agride|me agrediu|me espanca|apanho d|apanhei d|me ameac|violencia (domestica|em casa)|medo do meu (marido|companheiro|namorado))/;

  // Sinais físicos graves. Cada um vem com o "dono" provável (bebê ou mãe).
  const FISICO = [
    /\bsangr|hemorrag/,
    /\b(desmai|convuls|ataque|apagou|desacordad)/,
    /\b(bolsa (estourou|rompeu|rasgou)|perdendo (muito )?liquido)/,
    /\b(nao (ta |esta )?mexendo|parou de mexer|nao (sinto|to sentindo|estou sentindo) (ele|ela|o bebe|o nene|o nenem)? ?mexer|mexe(ndo)? (bem |muito )?menos)/,
    /\b(visao (turva|embacada)|vendo (pontos|estrelinhas|pontinhos)|vista (turva|escura|embacada))/,
    /\b(dor de cabeca (muito )?forte|dor de cabeca que nao passa)/,
    /\b(inchaco|inchad[oa]|inchou) (de repente|do nada|no rosto|na cara)/,
    /\b(falta de ar|nao (consigo|consegue|ta conseguindo|esta conseguindo) respirar|dificuldade (pra|para) respirar|respirando (mal|com dificuldade)|cansado pra respirar)/,
    /\b(engasg)/,
    /\b(roxo|roxinho|arroxead|azulad)/,
    /\b(nao acorda|muito molinho|muito mole|largadinho)/,
    /\b(febre|38 ?graus|39 ?graus|40 ?graus|ardendo em febre)/,
    /\b(dor (muito )?forte na barriga|dor na barriga (muito )?forte|contracao (forte|de 5 em 5|a cada))/,
    /\b(nao mama ha|nao quer mamar ha|recusa mamar|sem mamar ha)/
  ];

  const BEBE = /\b(bebe|nene|nenem|filh[oa]|crianca|recem.?nascid|ele |ela |dele|dela|neném)/;

  function detectarEmergencia(texto, contexto) {
    const t = norm(texto);
    if (MENTAL.some(r => r.test(t))) return { tipo: 'mental' };
    if (VIOLENCIA.test(t)) return { tipo: 'violencia' };
    if (!FISICO.some(r => r.test(t))) return null;
    if (/engasg/.test(t)) return { tipo: 'engasgo' };
    const falaDoBebe = BEBE.test(t + ' ');
    if (falaDoBebe && contexto !== 'gravida') return { tipo: 'bebe' };
    if (contexto === 'gravida') return { tipo: 'gravidez' };
    return { tipo: 'geral' };
  }

  globalThis.MareEmergencia = { detectarEmergencia };
})();
