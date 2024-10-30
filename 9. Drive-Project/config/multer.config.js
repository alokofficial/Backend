const multer = require('multer')

const firebaseStorage = require('multer-firebase-storage');
const firebase = require("../config/firebase.config");

const serviceAccount = require("../drive-b4606-firebase-adminsdk-6s9wy-b210e4c2ac.json");


const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: "drive-b4606.appspot.com",
    unique: true,
})

const upload = multer({ storage })

module.exports = upload;
