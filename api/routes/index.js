const express = require('express')
const router = express.Router()

const controllerCasas = require('../controller/controllerCasas')
const controllerFut = require('../controller/controllerFut')

router.use('/db', controllerCasas)
router.use('/fut', controllerFut)

module.exports=router