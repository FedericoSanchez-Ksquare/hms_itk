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
exports.readPatient = exports.readPatients = exports.createPatient = void 0;
const patient_1 = require("../models/patient");
const createPatient = (firstName, lastName, birth, weigth, height, gender, address, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPatient = yield patient_1.patient.create({ firstName, lastName,
            birth, weigth, height, gender, address, userId
        });
        return newPatient;
    }
    catch (error) {
        throw new Error("Can't create patient");
    }
});
exports.createPatient = createPatient;
const readPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readPatient = yield patient_1.patient.findAll();
        return readPatient;
    }
    catch (error) {
        throw new Error("Can't read patients");
    }
});
exports.readPatients = readPatients;
const readPatient = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readPatient = yield patient_1.patient.findOne({ where: { userId } });
        return readPatient;
    }
    catch (error) {
        throw new Error("Can't read patient");
    }
});
exports.readPatient = readPatient;
