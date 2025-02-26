const port = 3000;
const hostname = "localhost";
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    // Get URL and METHOD
    const url = req.url;

    let filePath = './public';
    //Switch Case Routing
    switch (url) {
        case '/':
            filePath += '/index.html';
            break;
        case '/about':
            filePath += '/about.html';
            break;
        case '/contact':
            filePath += '/contact.html';
            break;
        default:
            filePath += '/index.html';
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
});

// Error handling
server.on('error', (error) => {
    console.error('Server error:', error.message);
});

// Connection handling
server.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('end', () => {
        console.log('Client disconnected');
    });
});


server.on('listening', () => {
    console.log('Server is now listening');
});

server.on('close', () => {
    console.log('Server closed');
});

// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log('Available routes:');
    console.log('/');
    console.log('/about');
    console.log('/contact');
});