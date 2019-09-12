const express = require('express');

const server = express();

server.use(express.json());

let quantReq = 0;
const projetos = [
  { id: '1', title: 'Novo projeto', tasks: ['Tarefa1', 'Tarefa2'] },
  { id: '2', title: 'Projeto A ', tasks: ['Tarefa3', 'Tarefa3', 'Tarefa4'] },
  { id: '3', title: 'Projeto B', tasks: ['Tarefa5'] }
];


// Middleware Global
function quantRequests(req, res, next) {
    
    quantReq ++;
    console.log(`A quantidade de requisições foi de : ${quantReq}`);

    next();
}

server.use(quantRequests);

//middleware Específico
function checkProjectInArray(req, res, next){
    const projeto = projetos[req.params.index];

    if(!projeto) {
        return res.status(400).json({ error : "Projeto não existe!"});
    }

    req.projeto = projeto;

    return next();
}


server.get('/projects', (req, res) => {
  return res.json(projetos);
});


server.get('/project/:index', checkProjectInArray, (req, res) => {

  // Após o Middleware alterar o conteúdo do req, não precisaremos mais da linha abaixo  
  // const { index } = req.params;

    // Além do retorno tb ser alterado
//   return res.json(projetos[index]);
  return res.json(req.projeto);
});


server.post('/projects', (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const novoReg = { "id": id, "title": title, tasks: [] };

  projetos.push(novoReg);

  return res.json(projetos);
});


server.put('/project/:index', checkProjectInArray, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  projetos[index].title = title;

  return res.json(projetos);
});

server.post('/project/:index/tasks', checkProjectInArray, (req, res) => {
    const { index } = req.params;
    const { title } = req.body;

    projetos[index].tasks.push(title);

    return res.json(projetos);
});

server.delete('/project/:id', (req,res) => {
    const { id } = req.params;

    projetos.splice(id, 1);

    return res.send();

});


server.listen(3001);
