const knex = require('../database')

module.exports = {
    async avaliar(req, res, next) {
        try {
            const {id_imovel, id_user} = req.params
            const {pontos, comentario} = req.body

            const imovel = await knex('imovel').where('id', id_imovel)
            const usuario = await knex('usuarios').where('id', id_user)

            if( imovel.length == 0 ) {
                return res.json("Imóvel não encontrado")
            }

            if( usuario.length == 0 ) {
                return res.json("Usuario não encontrado")
            }

            await knex('feedback').insert({
                id_user,
                id_imovel,
                pontos,
                comentario
            })

            return res.json("Comentário realisado com sucesso")
        } catch (error) {
            next(error)
        }
    },

    async avaliações(req, res, next) {
        try {
            const {id_imovel} = req.params

            const imovel = await knex('imovel').where('id', id_imovel)

            if( imovel.length == 0 ) {
                return res.json("Imóvel não encontrado")
            }

            const feedback = await knex('feedback')
            .select('usuarios.nome', 'feedback.pontos', 'feedback.comentario')
            .innerJoin('usuarios', 'feedback.id_user', 'usuarios.id')
            .where({id_imovel})

            if( feedback.length == 0 ) {
                return res.json("Nenhum feedback encontrado")
            }

            return res.json(feedback)
        } catch (error) {
            next(error)
        }
    }
}