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
exports.AppointmentRouter.post("/", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentDate, appointmentDetails, appointmentTime, patientId, doctorId } = req.body;
    try {
        const newAppointment = yield (0, appointments_models_repo_1.createAppointments)(appointmentDate, appointmentDetails, appointmentTime, false, patientId, doctorId);
        res.status(201).send(newAppointment);
    }
    catch (error) {
        return res.status(500).send({ error: "Couldn't create appointments" });
    }
}));
//list patient appointments
exports.AppointmentRouter.get("/patients/:patientId", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    const { limit, offset } = req.query;
    try {
        const listAppointment = yield (0, appointments_models_repo_1.listAppointmentsPatient)(+patientId, limit ? +limit : 10, offset ? +offset : 0);
        if (listAppointment === "Invalid id") {
            res.statusCode = 400;
            res.json({
                message: listAppointment
            });
        }
        else {
            res.statusCode = 200;
            res.send(listAppointment);
        }
    }
    catch (error) {
        return res.status(500).send({ error: "Couldn't find patient appointments" });
    }
}));
//list doctors appointments
exports.AppointmentRouter.get("/doctors/:doctorId", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId } = req.params;
    const { orderBy, order, appointmentDate, appointmentTime, is_deleted, patientId } = req.query;
    let queryParams = {
        appointmentDate,
        appointmentTime,
        is_deleted,
        patientId
    };
    try {
        const listAppointmentsDoctors = yield (0, appointments_models_repo_1.listAppointmentsDoctor)(+doctorId, queryParams, order ? order : "ASC", orderBy ? orderBy : "id");
        res.statusCode = 200;
        res.json({
            id: listAppointmentsDoctors,
            message: "Appointments for doctor with ID= " + doctorId
        });
    }
    catch (error) {
        return res.status(500).send({ error: "Couldn't find doctor appointments" });
    }
}));
//shows all appointments or filter appointments
exports.AppointmentRouter.get("/all", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderBy, order, appointmentDate, appointmentTime, is_deleted, patientId, doctorId, limit, offset } = req.query;
    let queryParams = {
        appointmentDate,
        appointmentTime,
        is_deleted,
        patientId,
        doctorId
    };
    try {
        const readAppointment = yield (0, appointments_models_repo_1.listAllAppointments)(queryParams, orderBy ? orderBy : "id", order ? order : "ASC", limit ? +limit : 10, offset ? +offset : 0);
        res.statusCode = 200;
        res.send(readAppointment);
    }
    catch (error) {
        return res.status(500).send({ error: "Couldn't find appointments" });
    }
}));
exports.AppointmentRouter.get("/:id", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const readAppointment = yield (0, appointments_models_repo_1.findAppointment)(+id);
        if (readAppointment === "Invalid id") {
            res.statusCode = 400;
            res.json({
                message: readAppointment
            });
        }
        else {
            res.statusCode = 200;
            res.send(readAppointment);
        }
    }
    catch (error) {
        throw new Error("Couldn't get user");
    }
}));
// updates appointments
exports.AppointmentRouter.patch("/:id", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { is_deleted, appointmentDate, appointmentTime } = req.body;
    const payload = { is_deleted, appointmentDate, appointmentTime };
    try {
        const deleted = yield (0, appointments_models_repo_1.updateAppointment)(+id, payload);
        res.statusCode = 200;
        res.send(deleted);
    }
    catch (error) {
        return res.status(500).send({ error: "Couldn't update appointment" });
    }
}));
