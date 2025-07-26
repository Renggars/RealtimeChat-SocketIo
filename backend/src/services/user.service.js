import prisma from "../../prisma/index.js";

export const getMeService = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });
};

export const getAllUsersService = async (userId) => {
  return prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};
