// Import the HTTP module
const http = require('http');
// Define the request handler function
function handleRequest(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('Welcome to NodeJS studies');
    res.end();
}

// Create the server
const server = http.createServer(handleRequest);

// Define the port
const PORT = 8080;

// Start the server
server.listen(PORT, () => {

    console.log(`Server is running at http://localhost:${PORT}/`);

});