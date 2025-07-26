import prisma from "../../prisma/index.js";

export const fetchAllMessages = async () => {
  return await prisma.message.findMany({
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
      receiver: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const createMessage = async ({
  content,
  image,
  senderId,
  receiverId,
}) => {
  return await prisma.message.create({
    data: {
      content,
      image,
      senderId,
      receiverId,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
      receiver: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
    },
  });
};
