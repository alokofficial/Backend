const express = require('express')

const router = express.Router();
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

const {body, validationResult} = require('express-validator')


router.get('/register',(req,res)=>{
    res.render('register')
})


router.post('/register',
    
    body('username').trim().isLength({min:3}).withMessage('username is required or at least 3 character'),
    body('email').trim().isEmail().withMessage('email is required').isLength({min:13}).withMessage('email must be at least 13 characters long'),
    body('password').trim().isLength({min:5}).withMessage('password must be at least 5 characters long'),
    
    
    async (req, res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors: error.array(),
                message: "Invalid data"})
        }

        const {username, email, password} = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username: username,
            email:email,
            password:hashPassword,
        })
        res.send(newUser)
})


router.get('/login', (req, res)=>{
    res.render('login')
})

router.post('/login',
    body('username').trim().isLength({min:3}).withMessage('username is required or at least 3 character'),
    body('password').trim().isLength({min:5}).withMessage('password must be at least 5 characters long'),

    async (req, res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors: error.array(),
                message: "Invalid data"})
        }
    const {username, password} = req.body;
    const user = await userModel.findOne({username: username})
    if(!user){
        return res.status(400).json({message: "username or password is incorrect"})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json({message: "username or password is incorrect"})
    }
    res.send("Login successfully")
})

module.exports = router