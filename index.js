const express = require('express');

const server = express();

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "login": "John" }

const users = ['Yago', 'João', 'Fernando'];

server.get('/users/:id', (req, res) => {
    const name = req.query.name ? req.query.name : 'visitante' ;
    // const id = req.params.id ? req.params.id : 0;
    const { id } = req.params;

    return res.json(users[id]);
});

server.listen(5000);