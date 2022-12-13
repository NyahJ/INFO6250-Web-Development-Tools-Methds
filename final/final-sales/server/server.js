const config = require("./configs/config");
const createApp = require("./app");
const http = require("http");
const userData = require("./data/user-data-provider");
const recordData = require("./data/record-data-provider");
const sessions = {};
const userToSessionsMap = {};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Server is listening at port: " + addr.port);
};

const port = config.APP_PORT;
const app = createApp(userData, recordData, sessions, userToSessionsMap);
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
server.on("listening", onListening);
