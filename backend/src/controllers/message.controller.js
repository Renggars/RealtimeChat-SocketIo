import { emitToUser } from "../sockets/connection.js";
import {
  createMessage,
  getUsersForSideBarService,
  getMessagesService,
} from "../services/message.service.js";
import uploadFile from "../utils/uploadFile.js";

export const getUsersForSideBar = async (req, res) => {
  const loggedInUserId = req.user.id;
  try {
    const users = await getUsersForSideBarService(loggedInUserId);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getMessages = async (req, res) => {
  const { receiverId } = req.params;
  const senderId = req.user.id;
  try {
    const messages = await getMessagesService(senderId, receiverId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

export const sendMessage = async (req, res) => {
  const { content } = req.body;
  const { receiverId } = req.params;
  const senderId = req.user.id;

  try {
    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadFile(req.file, "messages");
    }

    const message = await createMessage({
      content,
      image: imageUrl,
      senderId,
      receiverId,
    });

    emitToUser(receiverId, "newMessage", message);

    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};
