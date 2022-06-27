"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDoctorModel = exports.doctor = void 0;
const sequelize_1 = require("sequelize");
class doctor extends sequelize_1.Model {
}
exports.doctor = doctor;
const initDoctorModel = (sequelize) => {
    doctor.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: new sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: new sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        medicalSpeciality: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        userId: {
            type: sequelize_1.DataTypes.STRING(100),
        }
    }, {
        tableName: 'doctor',
        sequelize: sequelize
    });
};
exports.initDoctorModel = initDoctorModel;
