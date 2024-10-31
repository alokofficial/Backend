const express = require('express')
const router = express.Router()
const upload = require('../config/multer.config')
const fileModel = require('../models/files.models')
const authMiddleWare = require('../middlewares/auth')
const auth = require('../middlewares/auth')
const firebase = require('../config/firebase.config')



router.get('/home',authMiddleWare, async(req, res)=>{

    const userFiles= await fileModel.find({user: req.user.userId})
    res.render('home',{
        files: userFiles
    })
})


router.post('/upload',authMiddleWare, upload.single('file'), async(req, res)=>{

    const newFile = await fileModel.create({
        path: req.file.path,
        originalname: req.file.originalname,
        user: req.user._id,
    })

    res.json(newFile)
    res.send('File uploaded successfully')
})  

router.get('/download/:path', authMiddleWare, async(req, res)=>{
    const loggedInUserId = req.user.userId;
    const path = req.params.path;
    const file = await fileModel.findOne({path: path, user: loggedInUserId})

    if(!file){
        return res.status(401).send('Unauthorized')
    }
    const signedUrl = await firebase.storage().bucket().file(file.path).getSignedUrl({
        action: 'read',
        expires: Date.now() + 60 * 1000
    })
    res.redirect(signedUrl[0])
})

module.exports = router;