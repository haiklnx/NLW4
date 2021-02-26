import 'reflect-metadata';
import express, { response } from 'express';
import createConnection from './database/'
import { router } from './routes';

//Cria a conexão com o DB
createConnection();

const app = express();
//Trabalha como json o body da requisição
app.use(express.json());
//Usa as rotas criadas
app.use(router);

export { app };