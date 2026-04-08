const express = require('express')
const cors = require('cors')

const app = express()

const controller = require('./routes/index')

app.use(express.json())
app.use(cors())

app.use('/api', controller)

app.listen(3333, '0.0.0.0', () => {
    console.log('ok')
})