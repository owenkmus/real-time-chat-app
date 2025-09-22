const { User, ChatRoom, Message, UserChatRoom } = require('../models');
const { sequelize } = require('../models');

// Esta función obtiene las salas de un usuario
exports.getChatRooms = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {
            include: [{
                model: ChatRoom,
                through: { attributes: [] }
            }]
        });
        res.json(user.ChatRooms);
    } catch (error) {
        next(error);
    }
};

// Esta función obtiene los mensajes de una sala
exports.getMessagesForRoom = async (req, res, next) => {
    try {
        const messages = await Message.findAll({
            where: { roomId: req.params.roomId },
            include: [{ model: User, attributes: ['id', 'username'] }],
            order: [['createdAt', 'ASC']]
        });
        res.json(messages);
    } catch (error) {
        next(error);
    }
};

// --- INICIO DE LA ACTUALIZACIÓN ---
// Esta nueva función maneja la lógica para crear una sala
exports.createRoom = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { name } = req.body;
        const userId = req.user.id;

        console.log('Creating room with name:', name, 'for user:', userId);

        if (!name) {
            return res.status(400).json({ message: 'El nombre de la sala es requerido' });
        }

        // 1. Crear la sala de chat
        const newRoom = await ChatRoom.create({ name, is_group: true }, { transaction: t });
        console.log('Room created:', newRoom.toJSON());

        // 2. Asociar al usuario creador con la sala
        await UserChatRoom.create({
            userId: userId,
            roomId: newRoom.id
        }, { transaction: t });

        await t.commit(); // Confirmar los cambios en la base de datos
        res.status(201).json(newRoom);

    } catch (error) {
        console.error('Error creating room:', error);
        await t.rollback(); // Deshacer los cambios si hay un error
        next(error);
    }
};
// --- FIN DE LA ACTUALIZACIÓN ---

