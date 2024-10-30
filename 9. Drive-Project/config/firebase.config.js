const Firebase = require("firebase-admin");

const serviceAccount = require("../drive-b4606-firebase-adminsdk-6s9wy-b210e4c2ac.json");

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: "drive-b4606.appspot.com"
});

module.exports = Firebase;
