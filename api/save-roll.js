export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, roll } = req.body;

        console.log(`Username: ${username}, Roll: ${roll}`);

        return res.status(200).json({ message: 'Roll saved!', username, roll });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
