export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ valor: 300 }); // Retorna valor de luminosidade como exemplo
    } else {
        res.status(405).json({ message: "Método não permitido" });
    }
}