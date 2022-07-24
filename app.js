//==========server setting
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

//==========data base setting
const Todo = require('./models/todo')

//==========ODM setting(use mongoose)
require('./config/mongoose')

//==========Template engine setting(use handlebars)
const exphbs = require('express-handlebars')
    //engine是指設定樣版引擎，所以代表我可以設定很多樣版引擎？但是網頁前台框架應該只會有一個？
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//==========session 設定
const session = require('express-session')
app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
    // 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

//==========中介軟體 設定
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//==========中介軟體 method-override 設定
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//==========middleware設定
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    next()
})

//==========setting alert
const flash = require('connect-flash')
app.use(flash()) // 掛載套件
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
    res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
    next()
})

//require router引入routes就會自動去找目錄下index的檔案 為何(怎樣才會去去尋找？)
const routes = require('./routes')
app.use(routes)


//==========run server
app.listen(PORT, () => {
    console.log(`Todo list server is running on http://localhost:${PORT}`)
})