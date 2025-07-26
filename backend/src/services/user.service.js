import prisma from "../../prisma/index.js";
import uploadFile from "../utils/uploadFile.js";

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

export const updateUserService = async (user, file) => {
  const profilePicUrl = await uploadFile(
    file,
    "profile-pictures",
    user.profilePic
  );

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      profilePic: profilePicUrl,
    },
  });

  const { password, ...safeUser } = updatedUser;
  return safeUser;
};
