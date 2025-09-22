const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Message extends Model {
        static associate(models) {
            Message.belongsTo(models.User, {
                foreignKey: 'userId'
            });
            Message.belongsTo(models.ChatRoom, {
                foreignKey: 'roomId'
            });
        }
    }

    Message.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Message',
        tableName: 'Messages',
        timestamps: true,
    });

    return Message;
};

