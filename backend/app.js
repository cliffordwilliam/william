// production? no dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// app maker
const express = require("express");
// home router
const homeRouter = require("./routers/homeRouter.js");
// error
const Middleware = require("./middleware.js");
// allow all access
const cors = require("cors");

// create app
const app = express();
app.use(cors());

// socket.io
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
// handle signals
io.on("connection", (socket) => {
  // join room
  socket.on("join_room", (room) => {
    socket.join(room);
  });
  // send message
  socket.on("send_message", (data) => {
    const { room, obj } = data;
    socket.to(room).emit("send_message", obj);
  });
});

// middlewares
app.use(express.urlencoded({ extended: true })); // req.body
app.use(express.json()); // for reading jest req
app.use(homeRouter); // enter home router
app.use(Middleware.error); // dump all err here

// export
module.exports = { app, server };
