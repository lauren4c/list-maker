const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");
require("dotenv").config();

// const http = require("http");
// const socketIO = require("socket.io");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const appConfig = require("./src/config/main-config.js");
const routeConfig = require("./src/config/route-config.js");

const port = process.env.PORT || "4001";

appConfig.init(app, express);
routeConfig.init(app);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// const server = http.createServer(app);

// const io = socketIO(server);

// io.on("connection", socket => {
//   console.log("User connected");
//
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
