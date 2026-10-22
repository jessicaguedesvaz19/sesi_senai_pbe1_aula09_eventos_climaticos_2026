const express = require("express")
const router = express.Router()
const usuario = require('./controllers/usuario')
const evento = require('./controllers/evento')

const rotaInicial = (req,res) => {
    res.json("Back-end respondendo")
}

router.get('/', rotaInicial)
router.get('/usuarios', usuario.listar)
router.post('/usuarios', usuario.cadastrar)
router.get('/eventos', evento.listar)
router.post('/eventos', evento.cadastrar)
router.delete('/evento/:id', evento.excluir)
router.delete('/usuario/:id', usuario.excluir)

module.exports = router