"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatesTime = exports.deleteAppointments = exports.listAppointmentsPatient = exports.readAppointmentsPatient = exports.readAppointments = exports.createAppointments = void 0;
const appointment_1 = require("../models/appointment");
const createAppointments = (appointmentDate, appointmentDetails, appointmentTime, is_deleted, patientId, doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createAppointment = yield appointment_1.appointment.create({
            appointmentDate, appointmentDetails, appointmentTime, is_deleted, patientId, doctorId
        });
        console.log("Appointment created with id= " + createAppointment.id);
        return createAppointment.id;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createAppointments = createAppointments;
const readAppointments = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id) {
            const readAppointment = yield appointment_1.appointment.findByPk(id);
            return readAppointment;
        }
        else {
            const readAppointment = yield appointment_1.appointment.findAll();
            return readAppointment;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.readAppointments = readAppointments;
const readAppointmentsPatient = (userId, patientId, doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (patientId) {
            const readOneAppointmentP = yield appointment_1.appointment.findOne({ where: { patientId: patientId } });
            return readOneAppointmentP;
        }
        if (doctorId) {
            const readOneAppointmentP = yield appointment_1.appointment.findOne({ where: { doctorId: doctorId } });
            return readOneAppointmentP;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.readAppointmentsPatient = readAppointmentsPatient;
const listAppointmentsPatient = (patientId, doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (patientId) {
            const readAllAppointmentsP = yield appointment_1.appointment.findAll({ where: { patientId: patientId } });
            return readAllAppointmentsP;
        }
        if (doctorId) {
            const readAllAppointmentsP = yield appointment_1.appointment.findAll({ where: { doctorId: doctorId } });
            return readAllAppointmentsP;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.listAppointmentsPatient = listAppointmentsPatient;
//mas brujeria
// export const readAppointmentsDoctor = async(
//   doctorId: number
// ) => {
//   try {
//     const readOneAppointmentD = await appointment.findOne({where: {doctorId:doctorId}});
//     return readOneAppointmentD
//   } catch (error) {
//     console.log(error)
//   }
// }
// export const listAppointmentsDoctor = async(
//   doctorId: number
// ) => {
//   try {
//     const listAllAppointmentsD = await appointment.findAll({where: {doctorId:doctorId}});
//     return listAllAppointmentsD
//   } catch (error) {
//     console.log(error)
//   }
// }
const deleteAppointments = (id, is_deleted) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteAppointment = yield appointment_1.appointment.update({ is_deleted: is_deleted }, { where: { id } });
        return deleteAppointment;
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAppointments = deleteAppointments;
const updatesTime = (id, appointmentTime, appointmentDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateTime = yield appointment_1.appointment.update({ appointmentTime: appointmentTime, appointmentDate: appointmentDate }, { where: { id } });
        console.log("time updated" + id);
        return updateTime;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updatesTime = updatesTime;
