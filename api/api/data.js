require('dotenv').config()

const URL_B = 'https://sports.bzzoiro.com/api/'

const getLigas = async () => {
    const response = await fetch(`${URL_B}leagues/`, {
        headers: {
            'Authorization': `Token ${process.env.KEY}`
        }
    })
    const data = await response.json()
    return data
}

const getMatchesEnLinea = async () => {
    const r = await fetch (`${URL_B}live/`, {
        headers: {
            'Authorization': `Token ${process.env.KEY}`
        }
    })
    const dt = await r.json()
    return dt
}

const getMatchesHui = async () => {
    const date = new Date()
    const aujourdhui = date.toISOString().split('T')[0]
    const r = await fetch (`${URL_B}events/?date_from=${aujourdhui}&date_to=${aujourdhui}`, {
        headers: {
            'Authorization': `Token ${process.env.KEY}`
        }
    })
    const dt = await r.json()
    return dt
}

const getMatchesHuiLeague = async (league) => {
    const date = new Date()
    const aujourdhui = date.toISOString().split('T')[0]
    const r = await fetch (`${URL_B}events/?league=${league}&date_from=${aujourdhui}&date_to=${aujourdhui}`, {
        headers: {
            'Authorization': `Token ${process.env.KEY}`
        }
    })
    const dt = await r.json()
    return dt
}

module.exports={ getLigas, getMatchesEnLinea, getMatchesHui, getMatchesHuiLeague }