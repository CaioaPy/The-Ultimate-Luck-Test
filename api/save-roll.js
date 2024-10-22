import mysql from 'mysql2/promise';

const connectionConfig = {
    host: 'sql5.freesqldatabase.com',
    user: 'sql5739727',
    password: 'hWr2gWUVle',
    database: 'sql5739727'
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, roll } = req.body;
        
        try {
            const connection = await mysql.createConnection(connectionConfig);
            const sql = 'INSERT INTO rolls (username, roll) VALUES (?, ?)';
            await connection.execute(sql, [username, roll]);
            await connection.end();
            return res.status(200).send('Roll saved!');
        } catch (error) {
            console.error('Error saving data:', error);
            return res.status(500).send('Error saving data');
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
