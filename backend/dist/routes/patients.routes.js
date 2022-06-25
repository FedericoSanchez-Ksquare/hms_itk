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
exports.PatientRouter = void 0;
const express_1 = require("express");
const patients_models_repo_1 = require("../repository/patients.models.repo");
const hasRoles_1 = require("../middlewares/hasRoles");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
exports.PatientRouter = (0, express_1.Router)();
//creates user patient
exports.PatientRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, birth, weigth, height, gender, address, userId } = req.body;
    try {
        const newPatientId = yield (0, patients_models_repo_1.createPatient)(firstName, lastName, birth, weigth, height, gender, address, userId);
        res.statusCode = 201;
        res.send(newPatientId);
    }
    catch (error) {
        return res.status(500).send({ error: "Couln't create patient" });
    }
}));
// lists the patients
exports.PatientRouter.get("/:userId?", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        if (userId === null || userId === undefined) {
            const listPatients = yield (0, patients_models_repo_1.readPatients)();
            res.status(200).send(listPatients);
        }
        else {
            const patient = yield (0, patients_models_repo_1.readPatient)(userId ? userId : "");
            res.status(200).send(patient);
        }
    }
    catch (error) {
        return res.status(500).send({ error: "Couldn't get patients" });
    }
}));
