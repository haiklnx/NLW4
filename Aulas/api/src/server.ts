import express, { response } from 'express';
const app = express();
/* 
GET -> busca
POST -> salvar
PUT -> alterar
DELETE -> deletar
PATCH -> alteração específica
*/
// https://localhost:3000/users
app.get('/', (req, res) => {
    return res.json({ message: 'Hello Wolrd - NLW 04' });
});

//1 param -> rota(recurso API)
//2 param -> request, response
app.post('/', (req, res) => {
    //recebeu os dados para salvar
    return res.json({ message: 'Dados salvos com sucesso!' })
})

app.listen(3333, () => console.log('Server Online'));
