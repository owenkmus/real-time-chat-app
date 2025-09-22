// Cargar variables de entorno
require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./src/models');
const errorHandler = require('./src/middlewares/errorHandler.middleware.js');
const logger = require('./src/utils/logger.util.js');
const initializeSocket = require('./src/services/socket.service.js');

const app = express();
const server = http.createServer(app);

// Inicializar Socket.IO
const io = initializeSocket(server);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Pasar la instancia de 'io' a las peticiones
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Rutas
app.get('/', (req, res) => res.send('Chat App API is running!'));
app.use('/api/auth', require('./src/routes/auth.routes.js'));
app.use('/api/chat', require('./src/routes/chat.routes.js'));


// Manejador de Errores Centralizado
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  logger.info(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    // Usar { force: true } solo en desarrollo para eliminar y recrear tablas
    // await sequelize.sync({ force: true }); 
    await sequelize.sync(); 
    logger.info('Database connected successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
});

