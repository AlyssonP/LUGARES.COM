const knex = require('../database')

module.exports = {
    async index(req, res, next) {
        try {
            const query = await knex('reservas')

            return res.json(query)
        } catch (error) {
            next(error)
        }
    },

    async resevar(req, res, next) {
        try {
            const {id_user, id_imovel, diacheckin, diacheckout, qtdPessoas, valortotalreserva} = req.body

            const reservaconfirmada = false
            const reserva_ativa = true
            await knex('reservas')
                .insert(id_user, 
                        id_imovel, 
                        diacheckin, 
                        diacheckout, 
                        qtdPessoas, 
                        valortotalreserva,
                        reservaconfirmada,
                        reserva_ativa)
            
            return res.json("Reserva realizada, falta efetuar o pagamento e confirmação")

        } catch (error) {
            next(error)
        }
    },

    async confirmarReserva(req, res, next) {
        try {
            const {id_reserva, id_user} = req.params
            const {cartao, nome, sobrenome, cpf} = req.body
            
            const query = await knex('reservas').where({id_reserva})

            if ( query.length == 0 ) {
                return res.json("Reserva não encontrada")
            }

            await knex('pagamentos').insert({
                id_user,
                id_reserva,
                cartao,
                nome,
                sobrenome,
                cpf
            })

            await query.update('reservaconfirmada', true)

            return res.json("Reserva confirmada com  sucesso")
        } catch (error) {
            next(error)
        }
    },

    async cancelarReserva(req, res, next) {
        try {
            const {id_reserva, id_user} = req.params

            const query = await knex('reservas').where({id_reserva}).where({id_user})

            if ( query.length == 0 ) {
                return res.json("Reserva não encontrada")
            }

            await query.update('reserva_ativa',false)

            return res.json("Cancelamento feito com sucesso")
        } catch (error) {
            next(error)
        }
    },

    async delete(req, res, next) {
        try {
            const {id_reserva} = req.params

            const query = await knex('reservas').where(id_reserva)

            if ( query.length == 0 ) {
                return res.json("Reserva não encontrada")
            }

            if ( query[0].reserva_ativa == true) {
                return res.json("Não é posivel deletar reserva, porque ela ainda está ativa")
            }

            await query.del()

            return res.json("Reserva deletarda com sucesso")

        } catch (error) {
            next(error)
        }
    }
}