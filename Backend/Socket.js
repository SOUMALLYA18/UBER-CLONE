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
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      try {
        const updatedCaptain = await captainModel.findByIdAndUpdate(
          userId,
          {
            location: {
              ltd: location.ltd,
              lng: location.lng,
            },
          },
          { new: true }
        );

        if (updatedCaptain) {
          console.log(`Captain's location updated: ${updatedCaptain.location}`);
          socket.emit("location-updated", {
            message: "Location updated successfully",
          });
        } else {
          console.log(`Captain with ID ${userId} not found.`);
          socket.emit("error", { message: "Captain not found" });
        }
      } catch (error) {
        console.error("Error updating captain location:", error);
        socket.emit("error", { message: "Error updating location" });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

const sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    const socket = io.sockets.sockets.get(socketId);
    if (socket) {
      socket.emit(messageObject.event, messageObject.data);
      console.log(`Message sent to ${socketId}: ${messageObject}`);
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
