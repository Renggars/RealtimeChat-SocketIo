import {
  getMeService,
  getAllUsersService,
  updatePictureService,
  updateUsernameService,
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

export const updatePicture = async (req, res) => {
  try {
    const user = req.user;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const updatedUser = await updatePictureService(user, req.file);

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Failed to update user" });
  }
};

export const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const userId = req.user.id;

    const updatedUser = await updateUsernameService(userId, username);
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Failed to update user" });
  }
};
