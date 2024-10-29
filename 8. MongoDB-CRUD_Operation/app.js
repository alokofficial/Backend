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

app.get('/register', (req, res)=>{
    res.render('register')
})
// create user
app.post('/register', async(req, res)=>{
    const {username,email,password} = req.body;
    const newUser = await userModel.create({
        username: username,
        email:email,
        password:password,
    })
    
    res.send(newUser)
})
// Read user
app.get('/get-users', async(req, res)=>{
    const users = await userModel.find().then((users)=>{
        res.send(users)
    });
})

// Update user
app.get('/update-user', async(req, res)=>{
    // const id = req.params.id
    // const user = await userModel.findById(id).then((user)=>{
    //     res.send(user)
    // });
    const user = await userModel.findOneAndUpdate({
        username: 'aa',
    }, {
        username: 'bb',
    }).then((user)=>{
        res.send(user)
    })
    
})

// Delete user
app.get('/delete-user', async(req, res)=>{
    // const id = req.params.id
    // const user = await userModel.findById(id).then((user)=>{
    //     res.send(user)
    // });
    const user = await userModel.findOneAndDelete({
        username: 'bb',
    }).then((user)=>{
        res.send(user)
    })
    
})



app.post('/get-form-data', (req, res)=>{
   
    console.log(req.body) 
    res.send("Form data received successfully")
})

app.listen(3000, ()=>{
    console.log("server is running on http://localhost:3000")
})
