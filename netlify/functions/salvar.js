import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  try {
    const body = await req.json();
    const { p0, p1, p2 } = body;

    if (!p0 || !p1 || !p2) {
      return new Response(JSON.stringify({ mensagem: 'Faltam dados.' }), { status: 400 });
    }

    const store = getStore('funcionarios_v3');
    // Salva o p2 como chave, e guarda o p0 e p1 dentro
    await store.setJSON(p2, { p0, p1 });

    return new Response(JSON.stringify({ mensagem: 'Dados salvos com sucesso!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ mensagem: 'Erro: ' + error.message }), { status: 500 });
  }
};
