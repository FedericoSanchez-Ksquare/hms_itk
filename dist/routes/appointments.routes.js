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
exports.AppointmentRouter = (0, express_1.Router)();
exports.AppointmentRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentDate, appointmentDetails, patientId, doctorId } = req.body;
    const newAppointmentId = yield (0, appointments_models_repo_1.createAppointments)(appointmentDate, appointmentDetails, patientId, doctorId);
    res.statusCode = 201;
    res.send({
        id: newAppointmentId,
    });
}));
exports.AppointmentRouter.get("/read", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readAppointment = yield (0, appointments_models_repo_1.readAppointments)(req.body.id);
    res.statusCode = 201;
    res.json({
        appointment: readAppointment,
    });
}));
