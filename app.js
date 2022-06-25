//==========server setting
const express = require('express')
const app = express()
const port = 3000

//==========data base setting
const Todo = require('./models/todo')

app.get('/', (req, res) => {
    Todo.find()
        .lean()
        .then(todos => res.render('index', { todos }))
        .catch(error => console.error(error))
})

//==========ODM setting(use mongoose)
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const db = mongoose.connection
    //連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected')
})

//==========Template engine setting(use handlebars)
const exphbs = require('express-handlebars')
    //engine是指設定樣版引擎，所以代表我可以設定很多樣版引擎？但是網頁前台框架應該只會有一個？
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


//==========router setting
app.get('/', (req, res) => {
    res.render('index')
})

//==========run server
app.listen(port, () => {
    console.log(`Todo list server is running on http://localhost:${port}`)
})