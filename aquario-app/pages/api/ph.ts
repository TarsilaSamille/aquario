import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ valor: 7.2 }); // Exemplo de dado fixo
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
