const express  = require('express')
const app = express();

const morgan = require('morgan')
app.use(morgan('dev')) // 3rd party middleware

// app.use((req, res, next)=>{
//     const a = 5;
//     const b = 10;
//     console.log(a + b)
//     next()
// })   //  general custom middleware      

// app.get('/', (req, res)=>{
//     res.send("Hello World")
// })

app.get('/', (req,res, next)=>{
    const a = 5;
    const b = 10;
    console.log(a + b)
    next() // specified custom middleware
}, (req, res)=>{
    res.send("Hello World")
})

app.get('/courses', (req, res)=>{
    res.send(JSON.stringify([1, 2, 3]))
})

app.listen(3000, ()=>{
    console.log("server is running on http://localhost:3000")
})
