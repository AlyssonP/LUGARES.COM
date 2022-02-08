const knex = require('../database')
const  bcrypt  =  require ( 'bcrypt' )

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

module.exports = {
    async index(req, res, next) {
        try {
            const { id_user } = req.params

            const query = await knex('usuarios').select('nome', 'email','contato', 'datanascimento').where('id', id_user)


            if ( query.length == 0 ) {
                return res.json('Usuário não encontrado')
            }

            return res.json(query)
        } catch (error) {
            next(error)
        }
    },

    async create(req, res, next) {
        try {

            const { nome, email, senha = '', contato, datanascimento } = req.body

            //Validação do E-mail
            if(!validateEmail(email)) {
                return res.json("E-mail inválido")
            }

            //Verificação de senha
            if( senha == '' ) {
                return res.json("Sem senha, adicione uma senha") 
            }

            const senhaCrypto = await bcrypt.hash ( senha ,  10 ) 

            await knex('usuarios').insert({
                nome,
                email,
                'senha': senhaCrypto,
                contato,
                datanascimento
            })

            return res.send()
        } catch (error) {
            next(error)
        }
    },

    async update(req, res, next) {
        try {
            const { nome, contato, datanascimento} = req.body
            const { id } = req.params

            if( nome ){
                await knex('usuarios')
                .update({ nome })
                .where({ id })
            } 

            if( contato ) {
                await knex('usuarios')
                .update({ contato })
                .where({ id })
            }

            if( datanascimento ) {
                await knex('usuarios')
                .update({ datanascimento })
                .where({ id })
            }

            return res.send()

        } catch (error) {
            next(error)
        }
    },

    async login(req, res, next) {
        try {
            const { email, senha } = req.body

            const query = await knex('usuarios').select('email', 'senha').where({email})

            if (!validateEmail(email)) {
                return res.json("Este e-mail é invalido")
            }

            if ( query.length == 0 ) {
                return res.json("Não foi possivel encontrar o usuário")
            }
            
            if (await bcrypt.compare( senha, query[0].senha)) {
                return res.json("Login feito com sucesso!")
            } else {
                return res.json("Senha incorreta")
            }

        } catch (error) {
            next(error)
        }
    },

    async ImoveisUser(req, res, next) {
        try {
            const {id_user} = req.params

            console.log(id_user)

            const query = await knex('imovel').select('titulo','descricao').where('id_proprietario', id_user)

            if( query.length == 0 ){
                return res.json("Ainda não tem imóvel anunciado")
             }

            return res.json(query)


        } catch (error) {
            next(error)
        }
    }
}