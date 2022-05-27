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
exports.updatesTime = exports.deleteAppointments = exports.listAllAppointments = exports.listAppointmentsDoctor = exports.readAppointmentsDoctor = exports.listAppointmentsPatient = exports.readAppointmentsPatient = exports.readAppointments = exports.createAppointments = void 0;
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
const readAppointments = (limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readAppointment = yield appointment_1.appointment.findAll({ limit: limit, offset: offset });
        return readAppointment;
    }
    catch (error) {
        console.log(error);
    }
});
exports.readAppointments = readAppointments;
const readAppointmentsPatient = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (patientId) {
            const readOneAppointmentP = yield appointment_1.appointment.findOne({ where: { patientId: patientId } });
            return readOneAppointmentP;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.readAppointmentsPatient = readAppointmentsPatient;
const listAppointmentsPatient = (patientId, limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (patientId) {
            const readAllAppointmentsP = yield appointment_1.appointment.findAll({ where: { patientId: patientId }, limit: limit, offset: offset });
            return readAllAppointmentsP;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.listAppointmentsPatient = listAppointmentsPatient;
const readAppointmentsDoctor = (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readOneAppointmentD = yield appointment_1.appointment.findOne({ where: { doctorId: doctorId } });
        return readOneAppointmentD;
    }
    catch (error) {
        console.log(error);
    }
});
exports.readAppointmentsDoctor = readAppointmentsDoctor;
const listAppointmentsDoctor = (id, filter, value, order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let listAllAppointmentsD;
        switch (filter) {
            case "patientId":
                if (value === "patientId" || value === "doctorId") {
                    listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [[value, order]], where: { doctorId: id } });
                }
                else {
                    listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [['id', order]], where: { doctorId: id, patientId: value } });
                }
                break;
            case "doctorId":
                if (value === "doctorId" || value === "patientId") {
                    listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [[value, order]], where: { doctorId: id } });
                }
                else {
                    listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [['id', order]], where: { doctorId: id } });
                }
                break;
            case "appointmentDate":
                listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [['id', order]], where: { doctorId: id, appointmentDate: value } });
                break;
            case "appointmentTime":
                listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [['id', order]], where: { doctorId: id, appointmentTime: value } });
                break;
            case "is_deleted":
                listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [['id', order]], where: { doctorId: id, is_deleted: value } });
                break;
            default:
                listAllAppointmentsD = yield appointment_1.appointment.findAll({ where: { doctorId: id } });
                break;
        }
        return listAllAppointmentsD;
    }
    catch (error) {
        console.log(error);
    }
});
exports.listAppointmentsDoctor = listAppointmentsDoctor;
const listAllAppointments = (id, filter, value, order, limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let listAllAppointmentsD;
        switch (filter) {
            case "patientId":
                if (id > 0) {
                    listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [['id', order]], where: { patientId: id }, limit: limit, offset: offset });
                }
                else {
                    listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [['patientId', order]], limit: limit, offset: offset });
                }
                break;
            case "doctorId":
                if (id > 0) {
                    listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [['id', order]], where: { doctorId: id }, limit: limit, offset: offset });
                }
                else {
                    listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [['doctorId', order]], limit: limit, offset: offset });
                }
                break;
            case "is_deleted":
                if (value === "false") {
                    listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [[filter, order]], where: { is_deleted: "false" }, limit: limit, offset: offset });
                }
                if (value === "true") {
                    listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [[filter, order]], where: { is_deleted: "true" }, limit: limit, offset: offset });
                }
                break;
            default:
                listAllAppointmentsD = yield appointment_1.appointment.findAll({ order: [[filter, order]], limit: limit, offset: offset });
                break;
        }
        return listAllAppointmentsD;
    }
    catch (error) {
        console.log(error);
    }
});
exports.listAllAppointments = listAllAppointments;
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
