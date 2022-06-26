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
exports.DoctorRouter = void 0;
const express_1 = require("express");
const doctor_models_repo_1 = require("../repository/doctor.models.repo");
const hasRoles_1 = require("../middlewares/hasRoles");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
exports.DoctorRouter = (0, express_1.Router)();
//creates doctor
exports.DoctorRouter.post("/", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, medicalSpeciality, userId } = req.body;
    try {
        const newDoctorId = yield (0, doctor_models_repo_1.createDoctor)(firstName, lastName, medicalSpeciality, userId);
        res.statusCode = 201;
        res.send(newDoctorId);
    }
    catch (error) {
        res.status(500).send({ error: "Can't create doctor" });
    }
}));
//shows list of doctors
exports.DoctorRouter.get("/list/:userId?", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin", "patient"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        if (userId === null || userId === undefined) {
            const listDoctors = yield (0, doctor_models_repo_1.readDoctors)();
            res.status(200).send(listDoctors);
        }
        else {
            const doctor = yield (0, doctor_models_repo_1.readDoctor)(userId ? userId : "");
            res.status(200).send(doctor);
        }
    }
    catch (error) {
        res.status(500).send({ error: "Can't read Doctors" });
    }
}));
exports.DoctorRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listDoctors = yield (0, doctor_models_repo_1.readDoctors)();
        res.status(200).send(listDoctors);
    }
    catch (error) {
        res.status(500).send({ error: "Can't read Doctors" });
    }
}));
