import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  const url = new URL(req.url);
  const numero = url.searchParams.get('P0');
  
  if (!numero) return new Response('Número não informado.', { status: 400 });

  const store = getStore('funcionarios');
  const dados = await store.get(numero, { type: 'json' });

  if (!dados) return new Response('Não encontrado.', { status: 404 });
  
  return new Response(JSON.stringify(dados), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
