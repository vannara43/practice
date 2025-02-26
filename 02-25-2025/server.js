const port = 3000;
const hostname = "localhost";

try {
    const http = require("http");
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('Hello World', 'utf8');
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
} catch (error) {
    console.log(error);
}