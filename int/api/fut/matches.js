const { header } = require("../../pages/styles/General")

const URL_B = 'http://192.168.0.14:3333/api/fut/'

const enLinea = async () => {
    const res = await fetch (`${URL_B}enlinea`)
    return res.json()
}

const today = async (league) => {
    const res = await fetch (`${URL_B}matcheshui`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ league })
    })
    return res.json()
}

module.exports={ enLinea, today }