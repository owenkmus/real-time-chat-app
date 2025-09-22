const { Server } = require('socket.io');
const logger = require('../utils/logger.util.js');
const jwt = require('jsonwebtoken');
const { Message, User } = require('../models');

function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:4200",
            methods: ["GET", "POST"]
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error: Token not provided.'));
        }
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
            if (err) {
                return next(new Error('Authentication error: Invalid token.'));
            }
            socket.user = decoded;
            next();
        });
    });

    io.on('connection', (socket) => {
        logger.info(`User connected: ${socket.id} (User ID: ${socket.user.id})`);

        socket.on('join_room', (roomId) => {
            socket.join(roomId);
            logger.info(`User ${socket.user.id} joined room ${roomId}`);
        });

        socket.on('send_message', async ({ roomId, content }) => {
            try {
                const message = await Message.create({
                    content,
                    userId: socket.user.id,
                    roomId
                });

                const user = await User.findByPk(socket.user.id, { attributes: ['id', 'username']});
                const fullMessage = { ...message.toJSON(), User: user.toJSON() };

                io.to(roomId).emit('receive_message', fullMessage);
            } catch (error) {
                logger.error('Error saving or broadcasting message:', error);
                socket.emit('error', { message: 'Could not send message.' });
            }
        });

        socket.on('typing', ({ roomId, isTyping }) => {
            socket.to(roomId).emit('typing', { userId: socket.user.id, username: socket.user.username, isTyping });
        });

        socket.on('disconnect', () => {
            logger.info(`User disconnected: ${socket.id}`);
        });
    });

    return io;
}

module.exports = initializeSocket;

