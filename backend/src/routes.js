const express = require('express')
const knex = require('./database')
const routes = express.Router()

const UsuarioController = require('./controllers/UsuarioController')
const ImovelController = require('./controllers/ImovelController')
const FeedbackController = require('./controllers/FeedbackController')
const ReservaController = require('./controllers/ReservaController')

routes.get('/typeimoveis', (req, res) => {
    knex('type_imovel').then((results) => res.json(results))
})

//Usuário
routes
    .get('/user/:id_user', UsuarioController.index)
    .get('/user/imoveis/:id_user', UsuarioController.ImoveisUser)
    .get('/user/reservas/:id_user', UsuarioController.minhasResevas)
    .get('/user/imovel/reservas/:id_imovel', UsuarioController.reservasImovel)
    .post('/users', UsuarioController.create)
    .post('/login', UsuarioController.login)
    .put('/users/:id', UsuarioController.update)
    
//Imóvel
routes
    .get('/imovel/:id_imovel', ImovelController.index)
    .get('/imoveis/:city', ImovelController.listImoveis)
    .get('/pesquisarimovel', ImovelController.pesquisaImovel)
    .post('/anunciarimovel', ImovelController.create)
    .put('/imovel/:id', ImovelController.update)
    .delete('/imovel/:id', ImovelController.delete)

//Feedback
routes
    .get('/feedbacks/:id_imovel', FeedbackController.avaliações)
    .post('/feedback/:id_imovel/:id_user', FeedbackController.avaliar)

//Reserva
routes
    .post('/reservar',ReservaController.resevar)
    .post('/confirmar_reserva/:id_reserva/:id_user', ReservaController.confirmarReserva)
    .post('/cancelar_reserva/:id_reserva/:id_user', ReservaController.cancelarReserva)


module.exports = routes