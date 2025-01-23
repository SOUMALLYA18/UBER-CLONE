const { Server } = require("socket.io");
const userModel = require("./models/userModel");
const captainModel = require("./models/captainModel");
let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New socket connection: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`user ${userId} joinded as ${userType}`);

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        console.log(`Captain  ${userId} is now connected `);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

const sendMessageToSocketId = (socketId, message) => {
  if (io) {
    const socket = io.sockets.sockets.get(socketId);
    if (socket) {
      socket.emit("message", message);
      console.log(`Message sent to ${socketId}: ${message}`);
    } else {
      console.log(`Socket with ID ${socketId} not found`);
    }
  } else {
    console.log("Socket server not initialized yet");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
