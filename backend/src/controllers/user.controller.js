import {
  getMeService,
  getAllUsersService,
  updateUserService,
} from "../services/user.service.js";

export const getMe = async (req, res) => {
  try {
    const user = await getMeService(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService(req.user.id);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const updatedUser = await updateUserService(user, req.file);
    res.json({ user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Failed to update user" });
  }
};
