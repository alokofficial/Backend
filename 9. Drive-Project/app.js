const express = require('express')
const app = express()
const userRouter = require('./routes/user.routes')
const connectToDB = require('./config/db')

connectToDB()



app.set('view engine', 'ejs')

// app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/user', userRouter)

app.get('/', (req, res)=>{
    res.render('index')
})

app.listen(3000, ()=>{
    console.log("server is running on http://localhost:3000")
})