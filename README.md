# CodTech Chat Application

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![node-current](https://img.shields.io/node/v/npm)
![npm-version](https://img.shields.io/npm/v/npm)

This is a real-time chat application built with Node.js, Express, Socket.IO, and MongoDB. It features a modern, colorful, and responsive user interface.

## Features

*   **User Authentication:** Secure user registration and login.
*   **Real-time Chat:** Instant messaging within chat rooms using WebSockets.
*   **Chat Rooms:** Users can create or join different chat rooms to communicate.
*   **Modern UI:** A clean and visually appealing user interface built with HTML and CSS.

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Real-time Communication:** Socket.IO
*   **Database:** MongoDB with Mongoose
*   **Frontend:** HTML, CSS, JavaScript

## Setup and Installation

To get the application up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd codtech-chat-backend
    ```

2.  **Install dependencies:**
    Make sure you have Node.js and npm installed.
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following, replacing the placeholder with your MongoDB connection string:
    ```
    MONGO_URI=mongodb://localhost:27017/codtech-chat
    PORT=5000
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    For development with automatic restarts, you can use:
    ```bash
    npm run dev
    ```

## Usage

1.  Open your web browser and navigate to `http://localhost:5000/register.html` to create a new account.
2.  After registering, go to `http://localhost:5000/login.html` to log in.
3.  Once logged in, you will be redirected to the main chat page.
4.  Enter a room name and click "Join" to start chatting.

## Deployment

This application can be easily deployed to platforms like Heroku, AWS, or any other service that supports Node.js applications.
