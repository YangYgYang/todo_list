const Todo = require('../todo') // 載入 todo model

const db = require('../../config/mongoose')

db.once('open', () => {
    console.log('mongodb connected!')
    for (let i = 0; i < 10; i++) {
        Todo.create({ name: `name-${i}` })
    }
    console.log('done')
})

// mongodb+srv://admin:1234@cluster0.0n5bj.mongodb.net/?retryWrites=true&w=majority