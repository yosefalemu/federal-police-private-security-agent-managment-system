
const socketIo = require("socket.io");

let io; 

const initSocket = (server) => {
  io = socketIo(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // You can add global Socket.IO event handlers here if needed

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      // Add cleanup or disconnect logic if needed
    });
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
};

module.exports = { initSocket, getIo };
