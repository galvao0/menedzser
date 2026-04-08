const express = require('express')

const router = express.Router()

const apiFut = require('../api/data.js')

router.get('/ligas', async (req, res) => {
    const ligas = await apiFut.getLigas()
    res.json(ligas)
})

router.get('/enlinea', async (req, res) => {
    const matches = await apiFut.getMatchesEnLinea()
    res.json(matches)
})

router.post('/matcheshui', async (req, res) => {
    const { league } = req.body
    let matches

    if (league > 0) {
        matches = await apiFut.getMatchesHuiLeague(league)
    } else {
        matches = await apiFut.getMatchesHui()
    }

    return res.json(matches)
})

module.exports=router