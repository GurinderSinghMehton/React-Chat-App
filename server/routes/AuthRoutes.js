import { Router } from "express";
import { signup, login, getUserInfo, updateProfile, addProfileImage, removeProfileImage, logout, googlesignup, googlelogin } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";


const authRoutes = Router();
const upload = multer({ dest: "uploads/profiles/" })

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/google-sigup", googlesignup)
authRoutes.post("/google-login", googlelogin)
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post("/add-profile-image", verifyToken, upload.single("profile-image"), addProfileImage);
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage)

authRoutes.post("/logout", logout);
export default authRoutes;