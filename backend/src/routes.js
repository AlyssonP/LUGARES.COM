const express = require('express')
const knex = require('./database')
const routes = express.Router()

const UsuarioController = require('./controllers/UsuarioController')
const ImovelController = require('./controllers/ImovelController')

routes.get('/typeimoveis', (req, res) => {
    knex('type_imovel').then((results) => res.json(results))
})

//Usuário
routes
    .get('/user/:id_user', UsuarioController.index)
    .get('/user/imoveis/:id_user', UsuarioController.ImoveisUser)
    .post('/users', UsuarioController.create)
    .post('/login', UsuarioController.login)
    .put('/users/:id', UsuarioController.update)
 
//Imóvel
routes
    .get('/imovel/:id_imovel', ImovelController.index)
    .get('/imoveis/:city', ImovelController.listImoveis)
    .post('/anunciarimovel', ImovelController.create)
    .put('/imovel/:id', ImovelController.update)
    .delete('/imovel/:id', ImovelController.delete)


module.exports = routes