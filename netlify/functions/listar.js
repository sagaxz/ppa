import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  try {
    const store = getStore('funcionarios');
    
    // Pega a lista de todas as chaves (números) salvas
    const { blobs } = await store.list();
    
    const listaCompleta = [];
    
    // Para cada número, busca os dados (nome e email)
    for (const blob of blobs) {
      const dados = await store.get(blob.key, { type: 'json' });
      listaCompleta.push({
        numero: blob.p0,
        nome: dados.p1,
        email: dados.p2
      });
    }
    
    return new Response(JSON.stringify(listaCompleta), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ erro: error.message }), { status: 500 });
  }
};
