import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  try {
    const body = await req.json();
    const { p0, p1, p2 } = body;

    if (!p0 || !p1 || !p2) {
      return new Response(JSON.stringify({ mensagem: 'Faltam dados.' }), { status: 400 });
    }

    // AQUI ESTÁ O SEGREDO: o Netlify captura o IP do visitante
    const ip = req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for') || 'Desconhecido';

    const store = getStore('funcionarios_v3');
    
    // Agora salvamos o p0, p1 E o ip
    await store.setJSON(p2, { p0, p1, ip });

    return new Response(JSON.stringify({ mensagem: 'Dados salvos com sucesso!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ mensagem: 'Erro: ' + error.message }), { status: 500 });
  }
};
