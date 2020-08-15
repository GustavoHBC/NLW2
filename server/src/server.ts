import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

// GET: buscar ou listar uma informação
// POST: criar alguma nova informação no backend
// PUT: atualizar uma informação existente
// DELETE: deletar uma informação existente

// PARÂMETROS
/* Corpo (Request Body): Dados para criação ou atualização de um registro [request.body]
 * Route Params: Identificar um recurso na rota / Identificar qual recurso eu quero atualizar ou deletar [request.params]
 * Query Params: Paginação, filtros, ordenação [request.query]
*/

// localhost:3333
app.listen(3333); // 'ouvir' requisições HTTP