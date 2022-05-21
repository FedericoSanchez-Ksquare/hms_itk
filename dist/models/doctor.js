"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDoctorModel = exports.doctor = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
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
        medicalSpeciality: {
            type: new sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
    }, {
        tableName: 'doctor',
        sequelize: sequelize
    });
    doctor.belongsTo(user_1.user);
};
exports.initDoctorModel = initDoctorModel;
