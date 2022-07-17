const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
        res.render('login')
    })
    //??為何到login頁面要用post
router.post('/login', (req, res) => {})

router.get('/register', (req, res) => {
    res.render('register')
})


module.exports = router