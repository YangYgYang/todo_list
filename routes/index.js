const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todo = require('./modules/todo')
const users = require('./modules/users')

router.use('/', home)
router.use('/todos', todo)
router.use('/users', users)






module.exports = router