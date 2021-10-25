const http = require("http");
const app = require("./app");

// either the hosted port or the the localhost 3000
const port = process.env.PORT || 3000;

// Need to pass the listener (a function executed when a new request is received and rerturns response )
const server = http.createServer(app);

// Listen for requests on this post
server.listen(port);
