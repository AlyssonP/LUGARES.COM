const express = require('express')
const knex = require('./database')
const routes = express.Router()

const UsuarioController = require('./controllers/UsuarioController')
const ImovelController = require('./controllers/ImovelController')

routes.get('/typeimoveis', (req, res) => {
    knex('type_imovel').then((results) => res.json(results))
})

routes.get('/users', UsuarioController.index)
routes.post('/users', UsuarioController.create)
routes.put('/users/:id', UsuarioController.update)
routes.post('/login', UsuarioController.login)

routes.get('/imoveis', ImovelController.index)
routes.post('/anunciarimovel', ImovelController.create)


module.exports = routes