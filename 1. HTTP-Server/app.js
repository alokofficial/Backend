// http is a core module no need to install

const http = require('http');

const server = http.createServer((req, res) => {

    if (req.url === '/') {

        res.write('Hello World')
        res.end()
    }
    if (req.url === '/courses') {
        res.write(JSON.stringify([1, 2, 3]))
        res.end()
    }
    
})

server.listen(3000)