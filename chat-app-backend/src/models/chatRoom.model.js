const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class ChatRoom extends Model {
        static associate(models) {
            ChatRoom.belongsToMany(models.User, {
                through: models.UserChatRoom,
                foreignKey: 'roomId',
                otherKey: 'userId'
            });
            ChatRoom.hasMany(models.Message, {
                foreignKey: 'roomId'
            });
        }
    }

    ChatRoom.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true // Nulo para mensajes directos
        },
        is_group: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'ChatRoom',
        tableName: 'ChatRooms',
        timestamps: true,
    });

    return ChatRoom;
};

