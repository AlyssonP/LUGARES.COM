const knex = require('../database')
const { update } = require('./UsuarioController')

module.exports = {
    async index(req, res, next) {
        try {
            const {id_imovel} = req.params

            const queryImovel = await knex('imovel').select('*').where('id', id_imovel)

            if( queryImovel.length == 0 ) {
                return res.json("Imóvel não encontrado")
            }

            const id_proprietario = queryImovel[0].id_proprietario
            const id_typeImovel = queryImovel[0].id_tipoimovel

            const queryProprietario = await knex('usuarios').select('nome').where('id', id_proprietario)
            const queryTypeImovel = await knex('type_imovel').select('nometype').where('id', id_typeImovel)
            
            return res.json({
                'tipo_imovel': queryTypeImovel[0].nometype, 
                'titulo': queryImovel[0].titulo,
                'descricao': queryImovel[0].descricao,
                'qtdpessoa': queryImovel[0].qtdpessoa,
                'qtdcama': queryImovel[0].qtdcama,
                'qtdquartos': queryImovel[0].qtdquartos,
                'qtdbanheiros': queryImovel[0].qtdbanheiros,
                'all_inclusive': queryImovel[0].all_inclusive,
                'vaga_garagem': queryImovel[0].vaga_garagem,
                'valordiaria': queryImovel[0].valordiaria,
                'proprietario': queryProprietario[0].nome,
                'endereco': queryImovel[0].endereco,
                'city': queryImovel[0].city,
                'uf': queryImovel[0].uf,
                'pais': queryImovel[0].pais,


            })
        } catch (error) {
            next(error)
        }
    },

    async listImoveis(req, res, next) {
        try {
            const {city} = req.params

            const query = await knex('imovel').select('titulo', 'descricao', 'valordiaria', 'endereco', 'city', 'uf', 'pais').where({city})

            if( query.length == 0 ) {
                return res.json("Imóveis não encontrado")
            }

            return res.json(query)
        } catch (error) {
            next(error)
        }
    },

    async create(req, res, next) {
        try {
            const { 
                id_tipoimovel,
                id_proprietario, 
                titulo, descricao, 
                valordiaria, 
                rua, bairro, city, uf, pais, 
                qtdpessoa, qtdcamas, qtdquartos,qtdbanheiros, vaga_garagem, 
                all_inclusive, imoveldisponivel } = req.body
            
    
            const endereco = `${rua}, ${bairro}`
    
            await knex('imovel').insert({
                id_proprietario,
                id_tipoimovel,
                titulo,
                descricao,
                valordiaria,
                endereco,
                city,
                uf,
                pais,
                qtdpessoa,
                qtdcamas, 
                qtdquartos,
                qtdbanheiros, 
                vaga_garagem, 
                all_inclusive, 
                imoveldisponivel
            })
    
            return res.json("Anuncio feito com sucesso!")
        } catch (error) {
            next(error)
            
        }
    },

    async update(req, res, next) {
        try {
            const { id } = req.params
            const { titulo, 
                descricao, 
                valordiaria, 
                endereco, city, uf, pais, 
                qtdpessoa, qtdcamas, qtdquartos, qtdbanheiros, 
                vaga_garagem, 
                all_inclusive} = req.body
            
            
            if( titulo ) {
                await knex('imovel')
                .update({ titulo })
                .where({ id })
            }

            if( descricao ) {
                await knex('imovel')
                .update({ descricao })
                .where({ id })
            }

            if( valordiaria ) {
                await knex('imovel')
                .update({ valordiaria })
                .where({ id })
            }
                
            if( endereco ) {
                await knex('imovel')
                .update({  endereco })
                .where({ id })
            }

            if( city ) {
                await knex('imovel')
                .update({ city })
                .where({ id })
            }

            if( uf ) {
                await knex('imovel')
                .update({ uf })
                .where({ id })
            }

            if( pais ) {
                await knex('imovel')
                .update({ pais })
                .where({ id })
            }

            if( qtdpessoa ) {
                await knex('imovel')
                .update({ qtdpessoa })
                .where({ id })
            }

            if( qtdcamas ) {
                await knex('imovel')
                .update({ qtdcamas })
                .where({ id })
            }

            if( qtdquartos ) {
                await knex('imovel')
                .update({ qtdquartos })
                .where({ id })
            }

            if( qtdbanheiros ) {
                await knex('imovel')
                .update({ titulo })
                .where({ id })
            }

            if( vaga_garagem ) {
                await knex('imovel')
                .update({ vaga_garagem })
                .where({ id })
            }

            if( all_inclusive ) {
                await knex('imovel')
                .update({ all_inclusive })
                .where({ id })
            }

            return res.json("Atualização feita")

        } catch (error) {
            next(error)
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params

            const query = await knex('imovel').where({ id })

            if( query.length == 0 ){
                return res.json("Imóvel não encontrado")
            }


            await knex('imovel').where({ id }).del()

            return res.json("Imovel excluido")
        } catch (error) {
            next(error)
        }
    },

    //Funções relacionada
    async avaliar(req, res, next) {},

    async avaliações(req, res, next) {}
}