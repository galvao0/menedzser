const casas = require('../api/apiCasa.js')
const casasapijson = require('./images/logo_casas.json')

const at = async () => {
    const casasBanco = await casas.getall()

    casasBanco.forEach(casaBanco => {
        const imgJson = casasapijson[casaBanco.nome]
        if (imgJson && imgJson !== casaBanco.imagem) {
            casas.atImagem(casaBanco.nome, imgJson)
        }   
    })

    console.log(casasBanco)
}

at()