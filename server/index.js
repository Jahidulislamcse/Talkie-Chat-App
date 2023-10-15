const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io"); //a class from socket.io library

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  /*instantiate Server using io to say I need to connect socket.io 
    with express I created, object to solve cors issues consisting some 
    credential or settings related to cors in socket.io server */
  cors: {
    origin: "http://localhost:3000",
    /*To tell socket.io that it is okay to accept socket communication with this "url" ,
        Telling this "url" the server which "url/server" is gonna be calling
         to socket.io server*/
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  /*Detect if someone connect to "socket.io" server*/
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    /*data getting from frontend "joinRoom" function with the help of "emit" function*/
    socket.join(data);
    console.log(`User ID: ${socket.id} Joined the room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server is Running");
});
