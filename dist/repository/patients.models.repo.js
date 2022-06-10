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
exports.readPatients = exports.createPatient = void 0;
const patient_1 = require("../models/patient");
const createPatient = (birth, weigth, height, gender, address, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPatient = yield patient_1.patient.create({
            birth, weigth, height, gender, address, userId
        });
        console.log("Patient created with id= " + newPatient.id);
        return newPatient.id;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createPatient = createPatient;
const readPatients = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id) {
            const readPatient = yield patient_1.patient.findByPk(id);
            return readPatient;
        }
        else {
            const readPatient = yield patient_1.patient.findAll();
            return readPatient;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.readPatients = readPatients;
