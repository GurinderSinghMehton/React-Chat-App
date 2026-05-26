# React Chat App

A modern chat application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Real-time Messaging**: Send and receive messages instantly
- **User Authentication**: Secure login and registration
- **Chat Rooms**: Create and join multiple chat rooms
- **User Presence**: See who is online
- **Message History**: View previous conversations
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Modern and intuitive user interface

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **JavaScript** - Programming language (97.7%)
- **CSS** - Styling (2%)
- **HTML** - Markup (0.3%)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Socket.IO** - Real-time communication

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/GurinderSinghMehton/React-Chat-App.git
cd React-Chat-App
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## 📁 Project Structure

```
React-Chat-App/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── README.md
└── .gitignore
```

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/react-chat-app
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Frontend (.env)

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

## ▶️ Running the Application

### Start MongoDB

```bash
mongod
```

### Start the Backend Server

```bash
cd backend
npm start
```

The backend server will run on `http://localhost:5000`

### Start the Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will open at `http://localhost:3000`

## 💡 Usage

1. **Register**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **Create/Join Chat**: Select or create a chat room
4. **Send Messages**: Type and send messages in real-time
5. **View History**: Access previous messages in the conversation
6. **Logout**: Sign out from the application

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Messages
- `GET /api/messages/:roomId` - Get messages from a room
- `POST /api/messages` - Send a message
- `DELETE /api/messages/:messageId` - Delete a message

### Rooms
- `GET /api/rooms` - Get all chat rooms
- `POST /api/rooms` - Create a new chat room
- `GET /api/rooms/:roomId` - Get room details

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Made with ❤️ by [GurinderSinghMehton](https://github.com/GurinderSinghMehton)**

For questions or issues, please open an issue on the [GitHub repository](https://github.com/GurinderSinghMehton/React-Chat-App).
