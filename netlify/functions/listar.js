import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  try {
    const store = getStore('funcionarios_v3');
    const { blobs } = await store.list();
    
    const listaCompleta = [];
    
    for (const blob of blobs) {
      const dados = await store.get(blob.key, { type: 'json' });
      if (dados) {
        listaCompleta.push({
          numero: blob.key,
          nome: dados.p0,
          email: dados.p1,
          ip: dados.ip || 'Não registrado' // <-- Adicionado aqui
        });
      }
    }
    
    return new Response(JSON.stringify(listaCompleta), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ erro: error.message }), { status: 500 });
  }
};
