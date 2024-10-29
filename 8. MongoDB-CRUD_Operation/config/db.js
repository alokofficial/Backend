const mongoose = require('mongoose')


const connection = mongoose.connect('mongodb://127.0.0.1:27017/users').then(()=>{
    
    console.log("MongoDB connected successfully")
})

module.exports = connection