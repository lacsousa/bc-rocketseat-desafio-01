const express = require('express');

const server = express();

server.use(express.json());

const projetos = [
    { id: "1", title: 'Novo projeto', tasks: ['Tarefa1','Tarefa2' ] },
    { id: "2", title: 'Projeto A ', tasks: ['Tarefa3', 'Tarefa3', 'Tarefa4'] },
    { id: "3", title: 'Projeto B', tasks: ['Tarefa5'] }

];

server.get('/projects', (req, res) => {
    return res.json(projetos);
});

server.listen(3001);