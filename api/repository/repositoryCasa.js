const db = require('../config/db')

const add = async (nome, imagem, banca) => {
    await db.query('INSERT INTO casa_aposta (nome, imagem, banca) values (?, ?, ?)', [nome, imagem, banca])
}

const getall = async () => {
    const [c] = await db.query('SELECT * FROM casa_aposta')
    return c
}

const get = async (nome) => {
    const [[c]] = await db.query('SELECT * FROM casa_aposta WHERE nome = ?', [nome])
    return c
}

const atImagem = async (nome, imagem) => {
    await db.query('update casa_aposta SET imagem = ? WHERE nome = ?', [imagem, nome])
}

const atBanca = async (nome, banca) => {
    await db.query('update casa_aposta SET banca = ? WHERE nome = ?', [banca, nome])
}

module.exports={ add, getall, atImagem, get, atBanca }