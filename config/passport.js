// config/passport.js
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userExample = require('../models/user')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

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
                return bcrypt.compare(password, user.password).then(isMatch => {
                    if (!isMatch) {
                        return done(null, false, { message: 'Email or Password incorrect.' })
                    }
                    return done(null, user)
                })
            })
            .catch(err => done(err, false))
    }))

    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK,
            profileFields: ['email', 'displayName']
        }, (accessToken, refreshToken, profile, done) => {
            const { name, email } = profile._json
            userExample.findOne({ email })
                .then(user => {
                    if (user) return done(null, user)
                    const randomPassword = Math.random().toString(36).slice(-8)
                    bcrypt
                        .genSalt(10)
                        .then(salt => bcrypt.hash(randomPassword, salt))
                        .then(hash => userExample.create({
                            name,
                            email,
                            password: hash
                        }))
                        .then(user => done(null, user))
                        .catch(err => done(err, false))
                })
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