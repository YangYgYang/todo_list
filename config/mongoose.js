//==========ODM setting(use mongoose)
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const db = mongoose.connection
    //連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected')
})

module.exports = db