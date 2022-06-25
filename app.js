//==========server setting
const express = require('express')
const app = express()
const port = 3000

//==========data base setting
const Todo = require('./models/todo')

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


//==========中介軟體 設定
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))


//==========router setting
app.get('/', (req, res) => {
    Todo.find()
        .lean()
        .then(todos => res.render('index', { todos }))
        .catch(error => console.error(error))
})


//U70寫router要設定在todos/new，我設定一樣反而連不到??
app.get('/new', (req, res) => {
    return res.render('new')
})

app.post('/todos', (req, res) => {
    const name = req.body.name
    console.log(req.body)
    return Todo.create({ name })
        // return 後面還可以加程式是因為.then是asynchronous嗎
        .then(() => { res.redirect('/') })
        .catch(error => console.log(error))
})

//==========run server
app.listen(port, () => {
    console.log(`Todo list server is running on http://localhost:${port}`)
})