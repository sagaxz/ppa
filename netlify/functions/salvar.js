import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  try {
    const { p0, p1, p2 } = await req.json();

    if (!p0 || !p1 || !p2) {
      return new Response(JSON.stringify({ mensagem: 'Faltam dados.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const store = getStore('funcionarios_v2'); // Nome novo para começar limpo
    // Salva organizado: o p0 vira nome, p1 vira email
    await store.setJSON(p2, { nome: p0, email: p1 });

    return new Response(JSON.stringify({ mensagem: 'Dados salvos com sucesso!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ mensagem: 'Erro no servidor.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
