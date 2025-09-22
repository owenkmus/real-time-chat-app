const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class UserChatRoom extends Model {}

    UserChatRoom.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        roomId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ChatRooms',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'UserChatRoom',
        tableName: 'User_ChatRooms',
        timestamps: false
    });
    
    return UserChatRoom;
};

