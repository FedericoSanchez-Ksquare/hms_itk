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
exports.readAppointments = exports.createAppointments = void 0;
const appointment_1 = require("../models/appointment");
const createAppointments = (appointmentDate, appointmentDetails, patientId, doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createAppointment = yield appointment_1.appointment.create({
            appointmentDate, appointmentDetails, patientId, doctorId
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
