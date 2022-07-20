const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

//==========router setting
console.log('router', router)
router.get('/', (req, res) => {
    console.log(req.user)
    if (typeof(req.user) === "undefined") {
        res.redirect('/users/login')
        return
    }
    Todo.find()
        .lean()
        .sort({ _id: 'asc' }) // desc
        .then(todos => res.render('index', { todos }))
        .catch(error => console.error(error))
})

module.exports = router