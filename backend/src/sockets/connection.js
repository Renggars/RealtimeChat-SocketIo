import { Server } from "socket.io";

let ioInstance = null;
const userSocketMap = {}; // { userId: socketId }

export function initSocket(server) {
  ioInstance = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  ioInstance.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    ioInstance.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      if (userId) {
        delete userSocketMap[userId];
        ioInstance.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
  });
}

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export function emitToUser(userId, eventName, payload) {
  const socketId = userSocketMap[userId];
  if (socketId && ioInstance) {
    ioInstance.to(socketId).emit(eventName, payload);
  }
}

export function getIo() {
  return ioInstance;
}
