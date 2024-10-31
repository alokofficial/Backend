const express = require('express')
const app = express()
const userRouter = require('./routes/user.routes')
const indexRouter = require('./routes/index.routes')
const connectToDB = require('./config/db')

const cookieParser = require('cookie-parser')

connectToDB()



app.set('view engine', 'ejs')

// app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', indexRouter)
app.use('/user', userRouter)


app.get('/', (req, res)=>{
    res.render('index')
})

process.on('uncaughtException', (err)=>{
    console.log(err)
})

app.listen(3000, ()=>{
    console.log("server is running on http://localhost:3000")
})