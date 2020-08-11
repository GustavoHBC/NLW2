import express from 'express';

const app = express();

// GET: buscar ou listar uma informação
// POST: criar alguma nova informação no backend
// PUT: atualizar uma informação existente
// DELETE: deletar uma informação existente

app.get('/users', (request, response) => {
    const users = [
        { name: 'Gustavo', age: 18},
        { name: 'Henrique', age: 18},
    ]
    
    return response.json(users);
});

// localhost:3333
app.listen(3333); // 'ouvir' requisições HTTP