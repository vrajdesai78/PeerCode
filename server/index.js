//HOSTED ON REPLIT

const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const ACTIONS = {
  JOIN: "join",
  JOINED: "joined",
  DISCONNECTED: "disconnected",
  CODE_CHANGE: "code-change",
  SYNC_CODE: "sync-code",
  LEAVE: "leave",
};

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("build"));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (evt) => {
    console.log(evt);
    socket.broadcast.emit("message", evt);
  });
  socket.on("notes", (evt) => {
    console.log(evt);
    socket.broadcast.emit("notes", evt);
  });
  socket.on("draw", (evt) => {
    console.log(evt);
    socket.broadcast.emit("draw", evt);
  });
});
io.on("disconnect", (evt) => {
  console.log("some people left");
});

const PORT = process.env.PORT || 1234;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
