// config/passport.js
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userExample = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = function(app) {
    // 初始化 Passport 模組
    app.use(passport.initialize())
    app.use(passport.session())
        // 設定本地登入策略
        // 設定序列化與反序列化

    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            userExample.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered!' })
                    }
                    if (user.password !== password) {
                        return done(null, false, { message: 'Email or Password incorrect.' })
                    }
                    return done(null, user)
                })
                .catch(err => done(err, false))
        }))
        // 設定序列化與反序列化
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        userExample.findById(id)
            .lean()
            .then(user => done(null, user))
            .catch(err => done(err, null))
    })
}