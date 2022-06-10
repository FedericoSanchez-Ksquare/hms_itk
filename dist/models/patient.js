"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPatientModel = exports.patient = void 0;
const sequelize_1 = require("sequelize");
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
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        weigth: {
            type: sequelize_1.DataTypes.INTEGER
        },
        height: {
            type: sequelize_1.DataTypes.INTEGER
        },
        gender: {
            type: sequelize_1.DataTypes.STRING(100),
        },
        address: {
            type: sequelize_1.DataTypes.STRING(100),
        },
        userId: {
            type: sequelize_1.DataTypes.STRING(100)
        }
    }, {
        tableName: 'patients',
        sequelize: sequelize
    });
};
exports.initPatientModel = initPatientModel;
