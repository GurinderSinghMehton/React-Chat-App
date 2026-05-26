import { Router } from "express";
import {
  getMessages,
  readMessage,
  uploadFile,
} from "../controllers/MessagesController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const messageRoutes = Router();
const upload = multer({ dest: "uploads/files" });
messageRoutes.post("/get-messages", verifyToken, getMessages);
messageRoutes.post("/read-messages", verifyToken, readMessage);
messageRoutes.post(
  "/upload-file",
  verifyToken,
  upload.single("file"),
  uploadFile,
);

export default messageRoutes;
