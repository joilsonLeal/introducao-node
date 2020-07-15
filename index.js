const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "login": "John" }

// const name = req.query.name ? req.query.name : 'visitante' ;
// const id = req.params.id ? req.params.id : 0;

const users = ['Yago', 'João', 'Fernando'];

server.use((req, res, next) => {
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url}`)

    next();

    console.timeEnd('Request');
});

function checkUserExists(req, res, next) {
    if(!req.body.name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    return next();
};

function checkUserInArray(req, res, next) {
    const { index } = req.params;
    if(!users[index]) {
        return res.status(400).json({ error: `User doesn't exists` });
    }
    return next();
};

server.get('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params;
    return res.json(users[index]);
});

server.get('/users', (req, res) => {
    return res.json(users);
});

server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body;
    users.push(name);
    return res.json(users);
});

server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;
    users[index] = name;
    return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params;
    users.splice(index, 1);
    return res.send();
});

server.listen(5000);