import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  try {
    const store = getStore('funcionarios_v3');
    const { blobs } = await store.list();
    
    const listaCompleta = [];
    
    for (const blob of blobs) {
      const dados = await store.get(blob.key, { type: 'json' });
      listaCompleta.push({
        numero: blob.key,
        nome: dados.p0,   // Lendo p0 direto
        email: dados.p1   // Lendo p1 direto
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
