const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
        name: {
            type: String, // 資料型別是字串
            required: true // 這是個必填欄位
        },
        isDone: {
            type: Boolean,
            default: false
        }
    })
    //用todoSchema來產生一個名為"Todo"的Model。
module.exports = mongoose.model('Todo', todoSchema)