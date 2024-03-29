const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todo = require('./modules/todo')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth') // 掛載middleware 


router.use('/todos', authenticator, todo)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router