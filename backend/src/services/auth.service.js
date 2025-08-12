import bcrypt from "bcryptjs";
import prisma from "../../prisma/index.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async ({ username, email, password }, res) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });

  if (existingUser) {
    throw new Error("Username atau email sudah terdaftar.");
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, email, password: hashed },
  });

  generateToken(user.id, res);
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic,
  };
};

export const login = async ({ email, password }, res) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  generateToken(user.id, res);

  return user;
};
