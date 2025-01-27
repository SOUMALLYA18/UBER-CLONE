const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;
const { initializeSocket } = require("./Socket");
const server = http.createServer(app);
initializeSocket(server);

if (process.env.NODE_ENV !== "production") {
  console.log(`Server is running on port ${port}`);
}

server.listen(port);
