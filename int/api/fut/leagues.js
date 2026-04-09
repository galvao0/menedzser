const URL_B = 'http://192.168.0.14:3333/api/fut/'

const get = async () => {
    const res = await fetch (`${URL_B}ligas`)
    return res.json()
}

module.exports={ get }