import {
  fetchAllMessages,
  createMessage,
} from "../services/message.service.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await fetchAllMessages();
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

export const sendMessage = async (req, res) => {
  const { content, image, receiverId } = req.validatedData;
  const senderId = req.user?.id;

  if (!senderId) {
    return res.status(401).json({ message: "Unauthorized: Sender not found" });
  }

  try {
    const message = await createMessage({
      content,
      image,
      senderId,
      receiverId,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};
