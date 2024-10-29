// need to install express module
const express = require('express')
const app = express()

app.get('/', (req, res)=>{
    res.send("Hello World")
})

app.get('/courses', (req, res)=>{
    res.send(JSON.stringify([1, 2, 3]))
})

const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})
