import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  try {
    const store = getStore('funcionarios_v2'); // Mesmo nome novo aqui
    
    // Pega a lista de todos os cadastros
    const { blobs } = await store.list();
    
    const listaCompleta = [];
    
    for (const blob of blobs) {
      const dados = await store.get(blob.key, { type: 'json' });
      listaCompleta.push({
        numero: blob.key,         // O número que o funcionário digitou
        nome: dados.nome,         // O nome organizado
        email: dados.email        // O email organizado
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
