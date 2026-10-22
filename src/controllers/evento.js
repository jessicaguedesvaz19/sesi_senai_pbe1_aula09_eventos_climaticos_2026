const con = require('../db')

const cadastrar = (req, res) => {
    const { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto } = req.body
    try {
        const query = 'INSERT INTO evento (usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto) VALUES (?, ?, ?, ?, ?, ?);'
        con.query(query, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar evento' })
            } else {
                const novoEvento = req.body
                novoEvento.id = results.insertId
                res.status(201).json({ message: 'Evento cadastrado com sucesso', user: novoEvento })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar evento', details: 'Informe { cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto }' })
    }
}

const listar = (req, res) => {
    const query = 'SELECT * FROM evento;'
    con.query(query, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar eventos' })
        } else {
            res.json(results)
        }
    })
}

const excluir = (req, res) => {
    const { id } = req.params

    try {
        const query = 'DELETE FROM evento WHERE id = ?;'

        con.query(query, [id], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao excluir evento' })
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Evento não encontrado' })
            } else {
                res.status(200).json({ message: 'Evento excluído com sucesso' })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao excluir evento' })
    }
}

module.exports = {
    cadastrar,
    listar,
    excluir
}