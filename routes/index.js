const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todo = require('./modules/todo')

router.use('/', home)
router.use('/todos', todo)





module.exports = router