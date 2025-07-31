const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import MongoDB models
const Message = require('./models/Message');
const Room = require('./models/Room');

// Initialize Express
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Serve frontend pages
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/login.html'))
);
app.get('/register', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/register.html'))
);
app.get('/chat', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/chat.html'))
);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('🟢 New user connected:', socket.id);

  // Join a chat room
  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined room: ${room}`);

    // Notify others in the room
    socket.to(room).emit('message', {
      username: 'System',
      content: `${username} has joined the chat`,
    });
  });

  // Receive and broadcast chat messages
  socket.on('chatMessage', async ({ room, username, content }) => {
    const msg = new Message({ room, username, content });
    await msg.save();

    io.to(room).emit('message', { username, content });
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
