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
exports.updateAppointment = exports.deleteAppointments = exports.findAppointment = exports.listAllAppointments = exports.listAppointmentsDoctor = exports.readAppointmentsDoctor = exports.listAppointmentsPatient = exports.readAppointmentsPatient = exports.readAppointments = exports.createAppointments = void 0;
const appointment_1 = require("../models/appointment");
const createAppointments = (appointmentDate, appointmentDetails, appointmentTime, is_deleted, patientId, doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createAppointment = yield appointment_1.appointment.create({
            appointmentDate, appointmentDetails, appointmentTime, is_deleted, patientId, doctorId
        });
        return createAppointment;
    }
    catch (error) {
        throw new Error("Something Wrong");
    }
});
exports.createAppointments = createAppointments;
const readAppointments = (limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readAppointment = yield appointment_1.appointment.findAll({ limit: limit, offset: offset });
        return readAppointment;
    }
    catch (error) {
        throw new Error("Something Wrong");
    }
});
exports.readAppointments = readAppointments;
const readAppointmentsPatient = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = yield appointment_1.appointment.findByPk(patientId);
        if (patientId === (validation === null || validation === void 0 ? void 0 : validation.patientId)) {
            const readOneAppointmentP = yield appointment_1.appointment.findOne({ where: { patientId: patientId } });
            return readOneAppointmentP;
        }
        else {
            return "Invalid id";
        }
    }
    catch (error) {
        throw new Error("Something Wrong");
    }
});
exports.readAppointmentsPatient = readAppointmentsPatient;
const listAppointmentsPatient = (patientId, limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = yield appointment_1.appointment.findByPk(patientId);
        if (patientId === (validation === null || validation === void 0 ? void 0 : validation.patientId)) {
            const readAllAppointmentsP = yield appointment_1.appointment.findAll({ where: { patientId }, limit, offset });
            return readAllAppointmentsP;
        }
        else {
            return "Invalid id";
        }
    }
    catch (error) {
        throw new Error("Couldn't find patient appointments");
    }
});
exports.listAppointmentsPatient = listAppointmentsPatient;
const readAppointmentsDoctor = (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = yield appointment_1.appointment.findByPk(doctorId);
        if (doctorId === (validation === null || validation === void 0 ? void 0 : validation.doctorId)) {
            const readOneAppointmentD = yield appointment_1.appointment.findOne({ where: { doctorId } });
            return readOneAppointmentD;
        }
        else {
            return "Invalid id";
        }
    }
    catch (error) {
        throw new Error("Couldn't read doctor appointment");
    }
});
exports.readAppointmentsDoctor = readAppointmentsDoctor;
const listAppointmentsDoctor = (id, queryParams, order, orderBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let where = {
            doctorId: id
        };
        if (queryParams.patientId) {
            where.patientId = queryParams.patientId;
        }
        if (queryParams.appointmentDate) {
            where.appointmentDate = queryParams.appointmentDate;
        }
        if (queryParams.appointmentTime) {
            where.appointmentTime = queryParams.appointmentTime;
        }
        if (queryParams.is_deleted) {
            where.is_deleted = queryParams.is_deleted;
        }
        const listAppointments = yield appointment_1.appointment.findAll({ order: [[orderBy, order]], where });
        return listAppointments;
    }
    catch (error) {
        throw new Error("Couldn't find doctor appointments");
    }
});
exports.listAppointmentsDoctor = listAppointmentsDoctor;
const listAllAppointments = (queryParams, orderBy, order, limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let where = {};
        if (queryParams.patientId) {
            where.patientId = queryParams.patientId;
        }
        if (queryParams.doctorId) {
            where.patientId = queryParams.patientId;
        }
        if (queryParams.appointmentDate) {
            where.appointmentDate = queryParams.appointmentDate;
        }
        if (queryParams.appointmentTime) {
            where.appointmentTime = queryParams.appointmentTime;
        }
        if (queryParams.is_deleted) {
            where.is_deleted = queryParams.is_deleted;
        }
        const listAppointments = yield appointment_1.appointment.findAll({ order: [[orderBy, order]], where, limit, offset });
        return listAppointments;
    }
    catch (error) {
        throw new Error("Couldn't find appointments");
    }
});
exports.listAllAppointments = listAllAppointments;
const findAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield appointment_1.appointment.findByPk(id);
        if (id === (appointments === null || appointments === void 0 ? void 0 : appointments.id)) {
            return appointments;
        }
        else {
            return "Invalid id";
        }
    }
    catch (error) {
        throw new Error("Couldn't find appointment");
    }
});
exports.findAppointment = findAppointment;
const deleteAppointments = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield appointment_1.appointment.findByPk(id);
        if ((appointments === null || appointments === void 0 ? void 0 : appointments.is_deleted.toString()) === "false") {
            const deleteAppointment = yield appointment_1.appointment.update({ is_deleted: true }, { where: { id } });
            return deleteAppointment;
        }
        else {
            const deleteAppointment = yield appointment_1.appointment.update({ is_deleted: false }, { where: { id } });
            return deleteAppointment;
        }
    }
    catch (error) {
        throw new Error("Couldn't delete appointment");
    }
});
exports.deleteAppointments = deleteAppointments;
const updateAppointment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield appointment_1.appointment.update(payload, { where: { id } });
    }
    catch (error) {
        throw new Error("Couldn't update appointment");
    }
});
exports.updateAppointment = updateAppointment;
