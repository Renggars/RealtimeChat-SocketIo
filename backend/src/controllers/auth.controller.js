import { register, login } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const user = await register(req.body, res);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await login(req.body, res);
    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
