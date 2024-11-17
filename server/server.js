const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const logsPath = path.join(__dirname, '../database/logs.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../views/index.html')));
app.get('/logs', (req, res) => res.sendFile(path.join(__dirname, '../views/logs.html')));
app.get('/cerita', (req, res) => res.sendFile(path.join(__dirname, '../views/cerita.html')));

app.post('/api/logs', (req, res) => {
    const { username } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const timestamp = new Date().toISOString();

    let logs = fs.existsSync(logsPath) ? JSON.parse(fs.readFileSync(logsPath)) : [];
    let log = logs.find(log => log.ip === ip && log.username === username);

    if (log) log.count++;
    else logs.push({ username: username || 'Anonymous', ip, timestamp, count: 1 });

    fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2));
    res.status(200).json({ message: 'Log updated' });
});

app.get('/api/logs', (req, res) => {
    const logs = fs.existsSync(logsPath) ? JSON.parse(fs.readFileSync(logsPath)) : [];
    res.json(logs);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));