import Message from "../models/MessageModal.js";
import { v2 as cloudinary } from "cloudinary";

export const getMessages = async (request, response, next) => {
  try {
    const user1 = request.userId;
    const user2 = request.body.id;

    if (!user1 || !user2) {
      return response.status(400).send("Both User ID's are required!");
    }

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamp: 1 });

    return response.status(200).json({ messages });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internet Server Error");
  }
};

export const uploadFile = async (request, response, next) => {
  try {
    if (!request.file) {
      return response.status(400).send("File is required");
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(request.file.path, {
      folder: "react-chat-app/files",
      resource_type: "auto",
    });

    return response.status(200).json({ filePath: result.secure_url });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("File upload failed");
  }
};
