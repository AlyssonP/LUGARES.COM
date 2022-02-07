const knex = require('../database')

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
            const query = await knex('imovel').select('titulo', 'descricao', 'valordiaria', 'endereco', 'city', 'uf', 'pais')

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