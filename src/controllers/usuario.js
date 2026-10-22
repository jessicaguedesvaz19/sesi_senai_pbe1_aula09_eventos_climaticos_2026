const con = require('../db')
const { excluir } = require('./evento')

const cadastrar = (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const query = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, password(?));'
        con.query(query, [nome, email, senha], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar usuário' })
            } else {
                const novoUsuario = req.body
                novoUsuario.id = results.insertId
                res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: novoUsuario })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar usuário', details: 'Informe { nome, email, senha }' })
    }
}

const listar = (req, res) => {
    const query = 'SELECT * FROM usuario;'
    con.query(query, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar usuários' })
        } else {
            res.json(results)
        }
    })
}

const usuario = (req, res) => {
    const { id } = req.params

    try {
        const query = 'DELETE FROM usuario WHERE id = ?;'

        con.query(query, [id], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao excluir usuario' })
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Usuario não encontrado' })
            } else {
                res.status(200).json({ message: 'Usuario excluído com sucesso' })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao excluir usuario' })
    }
}

module.exports = {
    cadastrar,
    listar,
    excluir
}
