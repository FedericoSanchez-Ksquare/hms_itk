"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserModel = exports.user = void 0;
const sequelize_1 = require("sequelize");
class user extends sequelize_1.Model {
}
exports.user = user;
const initUserModel = (sequelize) => {
    user.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        password: {
            type: new sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: new sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        is_active: {
            type: new sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
    }, {
        tableName: 'users',
        sequelize: sequelize
    });
};
exports.initUserModel = initUserModel;
