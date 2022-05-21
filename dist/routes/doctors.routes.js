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
exports.DoctorRouter = (0, express_1.Router)();
exports.DoctorRouter.post("/createDoctor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { medicalSpeciality, userId } = req.body;
    const newDoctorId = yield (0, doctor_models_repo_1.createDoctor)(medicalSpeciality, userId);
    res.statusCode = 201;
    res.send({
        id: newDoctorId,
    });
}));
exports.DoctorRouter.get("/showDoctor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readDoctor = yield (0, doctor_models_repo_1.readDoctors)(req.body.id);
    res.statusCode = 201;
    res.json({
        doctors: readDoctor,
    });
}));
