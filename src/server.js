const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'sql5.freesqldatabase.com',
    user: 'sql5739727',
    password: 'hWr2gWUVle',
    database: 'sql5739727'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database as ID ' + connection.threadId);
});

app.post('/save-roll', (req, res) => {
    const { username, roll } = req.body;
    console.log('Received data:', req.body);

    const sql = 'INSERT INTO rolls (username, roll) VALUES (?, ?)';
    connection.query(sql, [username, roll], (err, results) => {
        if (err) {
            console.error('Error saving data: ' + err.stack);
            return res.status(500).send('Error saving data');
        }
        res.status(200).send('Roll saved!');
    });
});

app.get('/leaderboard', (req, res) => {
    const sql = 'SELECT username, roll FROM rolls ORDER BY roll DESC LIMIT 10';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching leaderboard: ' + err.stack);
            return res.status(500).send('Error fetching leaderboard');
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
