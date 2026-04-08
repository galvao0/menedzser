const express = require('express')

const router = express.Router()
const repositoryCasa = require('../repository/repositoryCasa')

router.get('/casas', async (req, res) => {
    const casa = await repositoryCasa.getall()
    res.json(casa)
})

router.post('/addCasa', async (req, res) => {
    try {
        const { nome, imagem, banca } = req.body
        await repositoryCasa.add(nome, imagem, banca)
        res.json('Casa adicionada com sucesso')
    } catch (err) {
        console.log(err)
        res.json({ error: err })
    }
})

router.post('/atCasaImagem', async (req, res) => {
    try {
        const { nome, imagem } = req.body
        await repositoryCasa.atImagem(nome, imagem)
        res.json({ msg: 'Imagem da casa atualizada com sucesso' })
    } catch (err) {
        res.json({ error: err })
    }
})

router.post('/get', async (req, res) => {
    const { nome } = req.body
    const c = await repositoryCasa.get(nome)
    res.json(c)
})

router.post('/atCasaBanca', async (req, res) => {
    try {
        const { nome, banca } = req.body
        await repositoryCasa.atBanca(nome, banca)
        res.json({ msg: 'Banca atualizada com sucesso' })
    } catch (err) {
        res.json({ error: err })
    }
})

module.exports=router