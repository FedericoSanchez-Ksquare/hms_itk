"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAppointmentsModel = exports.appointment = void 0;
const sequelize_1 = require("sequelize");
const doctor_1 = require("./doctor");
const patient_1 = require("./patient");
class appointment extends sequelize_1.Model {
}
exports.appointment = appointment;
const initAppointmentsModel = (sequelize) => {
    appointment.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        appointmentDate: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        appointmentTime: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        appointmentDetails: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        is_deleted: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
    }, {
        tableName: 'appointments',
        sequelize: sequelize
    });
    appointment.belongsTo(patient_1.patient);
    appointment.belongsTo(doctor_1.doctor);
};
exports.initAppointmentsModel = initAppointmentsModel;
