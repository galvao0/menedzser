const URL_B = 'http://192.168.0.14:3333/api/db/'

const add = async (nome, imagem, banca) => {
    const r = await fetch(`${URL_B}addCasa`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, imagem, banca })
    })
    const d = await r.json()
    return d
}

const getall = async () => {
    const response = await fetch (`${URL_B}casas`)
    const data = await response.json()
    return data
}

const atImagem = async (nome, imagem) => {
    const r = await fetch (`${URL_B}atCasaImagem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, imagem })
    })

    const d = await r.json()
    console.log(d)
}

const get = async (nome) => {
    const response = await fetch (`${URL_B}get`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome })
    })
    const data = await response.json()
    return data
}

const atBanca = async (nome, banca) => {
    const r = await fetch (`${URL_B}atCasaBanca`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, banca })
    })
    const d = await r.json()
    console.log(d)
}

module.exports={ add, getall, atImagem, get, atBanca }