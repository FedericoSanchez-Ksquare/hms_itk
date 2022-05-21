"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPatientModel = exports.patient = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class patient extends sequelize_1.Model {
}
exports.patient = patient;
const initPatientModel = (sequelize) => {
    patient.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        birth: {
            type: new sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        weigth: {
            type: sequelize_1.DataTypes.INTEGER
        },
        height: {
            type: sequelize_1.DataTypes.INTEGER
        },
        gender: {
            type: new sequelize_1.DataTypes.STRING(100),
        },
        address: {
            type: new sequelize_1.DataTypes.STRING(100),
        },
    }, {
        tableName: 'patients',
        sequelize: sequelize
    });
    //patient.hasOne(user, { foreignKey: 'userid' })
    patient.belongsTo(user_1.user);
};
exports.initPatientModel = initPatientModel;
