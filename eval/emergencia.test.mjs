// Testes da regra fixa de emergência (sem IA, sem custo). Rodar: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import '../emergencia.js';

const { detectarEmergencia: d } = globalThis.MareEmergencia;
const tipo = (t, c) => d(t, c)?.tipo ?? null;

test('pensamentos de se machucar vão para o card de saúde mental', () => {
  assert.equal(tipo('às vezes penso em me matar', 'pos'), 'mental');
  assert.equal(tipo('nao quero mais viver', 'gravida'), 'mental');
  assert.equal(tipo('tenho vontade de jogar o bebê na parede', 'pos'), 'mental');
  assert.equal(tipo('tô ouvindo vozes', 'pos'), 'mental');
});

test('violência doméstica vai para o card da Central da Mulher', () => {
  assert.equal(tipo('meu marido me bate', 'gravida'), 'violencia');
  assert.equal(tipo('ele me agrediu ontem', 'pos'), 'violencia');
  assert.equal(tipo('tenho medo do meu companheiro', 'pos'), 'violencia');
});

test('sinais físicos na gravidez', () => {
  assert.equal(tipo('to com sangramento', 'gravida'), 'gravidez');
  assert.equal(tipo('a bolsa estourou', 'gravida'), 'gravidez');
  assert.equal(tipo('o neném parou de mexer', 'gravida'), 'gravidez');
  assert.equal(tipo('não to sentindo o bebe mexer desde ontem', 'gravida'), 'gravidez');
  assert.equal(tipo('visão embaçada e dor de cabeça forte', 'gravida'), 'gravidez');
  assert.equal(tipo('inchou de repente meu pé', 'gravida'), 'gravidez');
});

test('sinais físicos no bebê e na mãe depois do parto', () => {
  assert.equal(tipo('meu filho ta com febre', 'pos'), 'bebe');
  assert.equal(tipo('o nene ficou roxinho', 'pos'), 'bebe');
  assert.equal(tipo('ele não consegue respirar direito', 'pos'), 'bebe');
  assert.equal(tipo('o bebê engasgou com leite', 'pos'), 'engasgo');
  assert.equal(tipo('to sangrando muito e com febre', 'pos'), 'geral');
});

test('dúvidas comuns não disparam emergência', () => {
  for (const t of [
    'posso levar minha mãe no parto?',
    'como faço pra ele dormir?',
    'meu peito tá rachado e dói',
    'quanto tempo dura a licença maternidade',
    'to triste e chorando muito',
    'quais vacinas ele precisa tomar',
    'quando começo a dar papinha'
  ]) assert.equal(tipo(t, 'pos'), null, t);
});
