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



app.get('/', (req, res) => {
    res.send('todo list server')
})

app.listen(port, () => {
    console.log(`Todo list server is running on http://localhost:${port}`)
})