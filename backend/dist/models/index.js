"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const patient_1 = require("./patient");
const doctor_1 = require("./doctor");
const appointment_1 = require("./appointment");
const models = [user_1.initUserModel, patient_1.initPatientModel, doctor_1.initDoctorModel, appointment_1.initAppointmentsModel];
const startSequelize = (db_name, db_password, db_hostname, db_username) => {
    exports.sequelize = new sequelize_1.Sequelize(db_name, db_username, db_password, {
        dialect: "postgres",
        host: db_hostname,
        logging: false,
    });
    for (const initModel of models) {
        initModel(exports.sequelize);
    }
    exports.sequelize.sync();
};
exports.startSequelize = startSequelize;
