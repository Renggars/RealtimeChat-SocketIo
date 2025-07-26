import prisma from "../../prisma/index.js";

export const getUsersForSideBarService = async (userId) => {
  return await prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
    select: {
      id: true,
      username: true,
      profilePic: true,
    },
  });
};

export const getMessagesService = async (senderId, receiverId) => {
  return await prisma.message.findMany({
    where: {
      OR: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      sender: true,
      receiver: true,
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
    },
  });
};
