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
exports.AppointmentRouter.post("/create", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentDate, appointmentDetails, appointmentTime, is_deleted, patientId, doctorId } = req.body;
    const newAppointmentId = yield (0, appointments_models_repo_1.createAppointments)(appointmentDate, appointmentDetails, appointmentTime, is_deleted, patientId, doctorId);
    res.statusCode = 201;
    res.send({
        id: newAppointmentId,
    });
}));
exports.AppointmentRouter.get("/read", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readAppointment = yield (0, appointments_models_repo_1.readAppointments)(req.body.id);
    res.statusCode = 201;
    res.json({
        appointment: readAppointment,
    });
}));
exports.AppointmentRouter.get("/findAppointment/:patientId", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    const readAppointment = yield (0, appointments_models_repo_1.readAppointmentsPatient)(+patientId);
    res.statusCode = 201;
    res.json({
        desc: readAppointment,
    });
}));
exports.AppointmentRouter.get("/readListPatient/:patientId", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    const listAppointment = yield (0, appointments_models_repo_1.listAppointmentsPatient)(+patientId);
    res.statusCode = 201;
    res.json({
        desc: listAppointment,
    });
}));
//No se que hice aqui pero esta embrujado y siempre busca al fantasma de
// patientid y le vale el doctorid
exports.AppointmentRouter.get("/readDoctor/:doctorId", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId } = req.params;
    const readAppointmentDoctors = yield (0, appointments_models_repo_1.readAppointmentsDoctor)(+doctorId);
    res.statusCode = 201;
    res.json({
        desc: readAppointmentDoctors,
    });
}));
exports.AppointmentRouter.get("/listDoctor/:doctorId", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId } = req.params;
    const listAppointmentsDoctors = yield (0, appointments_models_repo_1.listAppointmentsDoctor)(+doctorId);
    res.statusCode = 201;
    res.json({
        appointmentDoctor: listAppointmentsDoctors,
    });
}));
exports.AppointmentRouter.patch("/updateTime", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, appointmentDate, appointmentTime } = req.body;
    const updatedTime = yield (0, appointments_models_repo_1.updatesTime)(id, appointmentDate, appointmentTime);
    res.statusCode = 201;
    res.send({
        id: updatedTime,
    });
}));
exports.AppointmentRouter.patch("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, is_deleted } = req.body;
    const deleted = yield (0, appointments_models_repo_1.deleteAppointments)(id, is_deleted);
    res.statusCode = 201;
    res.send({
        id: deleted,
    });
}));
