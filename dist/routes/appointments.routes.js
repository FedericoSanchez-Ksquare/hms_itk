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
exports.AppointmentRouter = void 0;
const express_1 = require("express");
const appointments_models_repo_1 = require("../repository/appointments.models.repo");
const hasRoles_1 = require("../middlewares/hasRoles");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
exports.AppointmentRouter = (0, express_1.Router)();
//creates appointments
exports.AppointmentRouter.post("/", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentDate, appointmentDetails, appointmentTime, is_deleted, patientId, doctorId } = req.body;
    try {
        const newAppointmentId = yield (0, appointments_models_repo_1.createAppointments)(appointmentDate, appointmentDetails, appointmentTime, is_deleted, patientId, doctorId);
        res.statusCode = 201;
        res.send({
            id: newAppointmentId,
            message: "Appointment created with ID= " + newAppointmentId
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AppointmentRouter.get("/findAppointmentsPatient/:patientId", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    try {
        const readAppointment = yield (0, appointments_models_repo_1.readAppointmentsPatient)(+patientId);
        res.statusCode = 201;
        res.json({
            id: readAppointment,
            message: "Appointments for patient with ID= " + patientId
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AppointmentRouter.get("/listAppointmentsPatient/:patientId", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    const { limit, offset } = req.query;
    try {
        const listAppointment = yield (0, appointments_models_repo_1.listAppointmentsPatient)(+patientId, limit ? +limit : 10, offset ? +offset : 0);
        res.statusCode = 201;
        res.json({
            id: listAppointment,
            message: "Appointments for patient with ID=" + patientId
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AppointmentRouter.get("/findAppointmentsDoctor/:doctorId", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId } = req.params;
    try {
        const readAppointmentDoctors = yield (0, appointments_models_repo_1.readAppointmentsDoctor)(+doctorId);
        res.statusCode = 201;
        res.json({
            id: readAppointmentDoctors,
            message: "Appointments for doctor with ID= " + doctorId
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AppointmentRouter.get("/listAppointmentsDoctor/:doctorId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId } = req.params;
    const { filter, value, order } = req.query;
    try {
        const listAppointmentsDoctors = yield (0, appointments_models_repo_1.listAppointmentsDoctor)(+doctorId, filter ? filter : "id", value ? value : "", order ? order : "ASC");
        res.statusCode = 201;
        res.json({
            id: listAppointmentsDoctors,
            message: "Appointments for doctor with ID= " + doctorId
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "something went wrong" });
    }
}));
//shows all appointments or filter appointments
exports.AppointmentRouter.get("/", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, filter, value, order, limit, offset } = req.query;
    try {
        const readAppointment = yield (0, appointments_models_repo_1.listAllAppointments)(id ? +id : 0, filter ? filter : "id", value ? value : "false", order ? order : "ASC", limit ? +limit : 10, offset ? +offset : 0);
        res.statusCode = 200;
        res.json({
            id: readAppointment,
            message: "Show all appointments"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "something went wrong" });
    }
}));
//update appointment time and date
exports.AppointmentRouter.patch("/updateAppointmentTime", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { appointmentDate, appointmentTime } = req.body;
    try {
        const updatedTime = yield (0, appointments_models_repo_1.updatesTime)(+id, appointmentDate, appointmentTime);
        res.statusCode = 201;
        res.send({
            id: updatedTime,
            message: "Time on appointment updated"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "something went wrong" });
    }
}));
// enables and disables appointments
exports.AppointmentRouter.patch("/:id", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield (0, appointments_models_repo_1.deleteAppointments)(+id);
        res.statusCode = 201;
        res.send({
            id: deleted,
            message: "Appointment state updated with ID= " + deleted
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "something went wrong" });
    }
}));
