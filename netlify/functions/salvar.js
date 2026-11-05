import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  try {
    // Recebe os campos p0, p1 e p2
    const { p0, p1, p2 } = await req.json();

    // Se algum estiver vazio, avisa
    if (!p0 || !p1 || !p2) {
      return new Response(JSON.stringify({ mensagem: 'Faltam dados. Recebido: ' + JSON.stringify({p0, p1, p2}) }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Salva no banco do Netlify usando p2 (o número) como chave
    const store = getStore('funcionarios');
    await store.setJSON(p2, { p0, p1 });

    return new Response(JSON.stringify({ mensagem: 'Dados salvos com sucesso!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ mensagem: 'Erro no servidor: ' + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
