"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoleModel = exports.roles = void 0;
const sequelize_1 = require("sequelize");
class roles extends sequelize_1.Model {
}
exports.roles = roles;
const initRoleModel = (sequelize) => {
    roles.init({
        role: {
            type: new sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    }, {
        tableName: 'role',
        sequelize: sequelize
    });
    roles.sync();
};
exports.initRoleModel = initRoleModel;
