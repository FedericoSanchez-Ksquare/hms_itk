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
exports.AppointmentRouter = exports.DoctorRouter = exports.PatientRouter = exports.RolesRouter = exports.UserRouter = void 0;
const express_1 = require("express");
const users_models_repo_1 = require("../repository/users.models.repo");
const patients_models_repo_1 = require("../repository/patients.models.repo");
const doctor_models_repo_1 = require("../repository/doctor.models.repo");
const roles_models_repo_1 = require("../repository/roles.models.repo");
const appointments_models_repo_1 = require("../repository/appointments.models.repo");
exports.UserRouter = (0, express_1.Router)();
exports.RolesRouter = (0, express_1.Router)();
exports.PatientRouter = (0, express_1.Router)();
exports.DoctorRouter = (0, express_1.Router)();
exports.AppointmentRouter = (0, express_1.Router)();
exports.UserRouter.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, password, email, is_active, roleId } = req.body;
    const newUserId = yield (0, users_models_repo_1.createUser)(firstName, lastName, password, email, is_active, roleId);
    res.statusCode = 201;
    res.send({
        id: newUserId,
    });
}));
exports.RolesRouter.post("/createRole", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body;
    const newRoleId = yield (0, roles_models_repo_1.createRole)(role);
    res.statusCode = 201;
    res.send({
        id: newRoleId,
    });
}));
exports.PatientRouter.post("/createPatient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { birth, weigth, height, gender, address, userId } = req.body;
    const newPatientId = yield (0, patients_models_repo_1.createPatient)(birth, weigth, height, gender, address, userId);
    res.statusCode = 201;
    res.send({
        id: newPatientId,
    });
}));
exports.DoctorRouter.post("/createDoctor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { medicalSpeciality, userId } = req.body;
    const newDoctorId = yield (0, doctor_models_repo_1.createDoctor)(medicalSpeciality, userId);
    res.statusCode = 201;
    res.send({
        id: newDoctorId,
    });
}));
exports.UserRouter.get("/showUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readUser = yield (0, users_models_repo_1.readUsers)(req.body.id);
    res.statusCode = 201;
    res.json({
        users: readUser,
    });
}));
exports.PatientRouter.get("/showPatient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readPatient = yield (0, patients_models_repo_1.readPatients)(req.body.id);
    res.statusCode = 201;
    res.json({
        patients: readPatient,
    });
}));
exports.DoctorRouter.get("/showDoctor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readDoctor = yield (0, doctor_models_repo_1.readDoctors)(req.body.id);
    res.statusCode = 201;
    res.json({
        doctors: readDoctor,
    });
}));
exports.AppointmentRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentDate, appointmentDetails, patientId, docotorId } = req.body;
    const newAppointmentId = yield (0, appointments_models_repo_1.createAppointments)(appointmentDate, appointmentDetails, patientId, docotorId);
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
