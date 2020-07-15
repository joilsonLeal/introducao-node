const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "login": "John" }

// const name = req.query.name ? req.query.name : 'visitante' ;
// const id = req.params.id ? req.params.id : 0;

const users = ['Yago', 'João', 'Fernando'];

server.get('/users/:index', (req, res) => {
    const { index } = req.params;
    return res.json(users[index]);
});

server.get('/users', (req, res) => {
    return res.json(users);
});

server.post('/users', (req, res) => {
    const { name } = req.body;
    users.push(name);
    return res.json(users);
});

server.put('/users/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;
    users[index] = name;
    return res.json(users);
});

server.delete('/users/:index', (req, res) => {
    const { index } = req.params;
    users.splice(index, 1);
    return res.json(users);
});

server.listen(5000);