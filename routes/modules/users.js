const express = require('express')
const userExample = require('../../models/user')
const router = express.Router()
const passport = require('passport')


router.get('/login', (req, res) => {
        res.render('login')
    })
    //??為何到login頁面要用post
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    //取得註冊表單參數
    const userInfo = req.body
    console.log(userInfo)
    userExample.findOne({ email: userInfo.email })
        .then(user => {
            if (user) {
                console.log('User already exists.')
                res.render('register', userInfo)
            } else {
                userExample.create(userInfo)
                res.redirect('/')
            }
        })
        .catch(error => console.log('error', error))
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/users/login')
})

module.exports = router