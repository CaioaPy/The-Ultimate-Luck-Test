import mysql from 'mysql2/promise';

const connectionConfig = {
    host: 'sql5.freesqldatabase.com',
    user: 'sql5739727',
    password: 'hWr2gWUVle',
    database: 'sql5739727'
};

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const connection = await mysql.createConnection(connectionConfig);
            const sql = 'SELECT username, roll FROM rolls ORDER BY roll DESC LIMIT 10';
            const [results] = await connection.execute(sql);
            await connection.end();
            return res.status(200).json(results);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            return res.status(500).json({ message: 'Error fetching leaderboard' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
