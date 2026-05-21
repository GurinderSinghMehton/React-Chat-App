import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js"
import contactsRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messageRoutes from "./routes/MessagesRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

// Serve static files from uploads
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

// Serve static files from the React build
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactsRoutes)
app.use('/api/messages', messageRoutes)

// Catch-all route for React Router (must be after API routes)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const server = app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
});

setupSocket(server);

mongoose    
.connect(databaseURL)
.then(() => {
    console.log("DB Connection Successful!"); 
})
.catch((err) => {
    console.log("DB Connection Failed!", err.message);
});