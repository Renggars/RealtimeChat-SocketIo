import prisma from "../../prisma/index.js";

export default function chatSocket(io, socket) {
  socket.on("chat:send", async ({ content, image, senderId, receiverId }) => {
    const message = await prisma.message.create({
      data: {
        content,
        image,
        senderId,
        receiverId,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    io.emit("chat:receive", message);
  });
}
