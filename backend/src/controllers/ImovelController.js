const knex = require('../database')

module.exports = {
    async index(req, res, next) {
        try {
            const query = await knex('imovel').select('*')

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
    }
}