require('dotenv').config()

const mysql = require('mysql2/promise')

const conn = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NEV,
    password: process.env.DB_PSS,
    port: process.env.DB_PORT
})

module.exports=conn