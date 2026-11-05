// netlify/functions/consultar.js
const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  // Pega o número da URL (ex: /cd123 -> numero = "123")
  const numero = event.queryStringParameters.numero;

  if (!numero) {
    return { statusCode: 400, body: 'Número do funcionário não informado.' };
  }

  const store = getStore('funcionarios');
  // Busca os dados guardados com essa chave
  const dados = await store.get(numero, { type: 'json' });

  if (!dados) {
    return { statusCode: 404, body: 'Funcionário não encontrado.' };
  }

  // Devolve os dados para a sua página
  return {
    statusCode: 200,
    body: JSON.stringify(dados)
  };
};
