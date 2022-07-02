const mongoose = require('mongoose')
const Todo = require('../todo') // 載入 todo model

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
    for (let i = 0; i < 10; i++) {
        Todo.create({ name: `name-${i}` })
    }
    console.log('done')
})

// mongodb+srv://admin:1234@cluster0.0n5bj.mongodb.net/?retryWrites=true&w=majority