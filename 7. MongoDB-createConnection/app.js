const express  = require('express')
const mongoose = require('mongoose')
const userModel = require('./models/user')
const dbConnection = require('./config/db')


const app = express();

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/get-form-data', (req, res)=>{
    // console.log(req.query) // query string for get request
    console.log(req.body) // query string for post request with two build in middleware like body-parser(json) and express.urlencoded
    res.send("Form data received successfully")
})

app.listen(3000, ()=>{
    console.log("server is running on http://localhost:3000")
})
