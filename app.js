const express = require('express')
const app = express()
const port = 3000

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

const exphbs = require('express-handlebars')

//extname是什麼意思？engine是指設定樣版引擎，所以代表我可以設定很多樣版引擎？但是網頁前台框架應該只會有一個？
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Todo list server is running on http://localhost:${port}`)
})