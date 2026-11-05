// netlify/functions/salvar.js
const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  // Pega os dados que o formulário enviou
  const dados = JSON.parse(event.body);
  const { numero, cpf, rg, nome } = dados;

  if (!numero || !cpf || !rg || !nome) {
    return { statusCode: 400, body: 'Faltam dados obrigatórios.' };
  }

  // Abre o "armário" (store) chamado 'funcionarios'
  const store = getStore('funcionarios');

  // Guarda os dados usando o número como chave
  // O valor pode ser um objeto JSON
  await store.setJSON(numero, { cpf, rg, nome });

  return {
    statusCode: 200,
    body: JSON.stringify({ mensagem: 'Dados salvos com sucesso!' })
  };
};
