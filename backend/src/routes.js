const express = require('express')
const knex = require('./database')
const routes = express.Router()

const UsuarioController = require('./controllers/UsuarioController')
const ImovelController = require('./controllers/ImovelController')

routes.get('/typeimoveis', (req, res) => {
    knex('type_imovel').then((results) => res.json(results))
})

routes.get('/user/:id_user', UsuarioController.index)
routes.get('/user/imoveis/:id', UsuarioController.ImoveisUser)
routes.post('/users', UsuarioController.create)
routes.put('/users/:id', UsuarioController.update)
routes.post('/login', UsuarioController.login)

routes.get('/imovel/:id_imovel', ImovelController.index)
routes.post('/anunciarimovel', ImovelController.create)
routes.get('/imoveis', ImovelController.listImoveis)


module.exports = routes