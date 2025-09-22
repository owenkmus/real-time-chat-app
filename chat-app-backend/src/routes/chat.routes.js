const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Ruta para obtener todas las salas de chat del usuario autenticado
router.get('/rooms', authMiddleware, chatController.getChatRooms);

// Ruta para obtener todos los mensajes de una sala específica
router.get('/rooms/:roomId/messages', authMiddleware, chatController.getMessagesForRoom);

// Ruta para crear una nueva sala de chat
router.post('/rooms', authMiddleware, chatController.createRoom);

module.exports = router;
