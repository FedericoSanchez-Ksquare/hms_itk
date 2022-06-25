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
exports.readDoctor = exports.readDoctors = exports.createDoctor = void 0;
const doctor_1 = require("../models/doctor");
const createDoctor = (firstName, lastName, medicalSpeciality, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDoctor = yield doctor_1.doctor.create({ firstName, lastName,
            medicalSpeciality,
            userId,
        });
        return newDoctor;
    }
    catch (error) {
        throw new Error("Can't create doctor");
    }
});
exports.createDoctor = createDoctor;
const readDoctors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readDoctor = yield doctor_1.doctor.findAll();
        return readDoctor;
    }
    catch (error) {
        throw new Error("Can't read Doctors");
    }
});
exports.readDoctors = readDoctors;
const readDoctor = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readDoctor = yield doctor_1.doctor.findOne({ where: { userId } });
        return readDoctor;
    }
    catch (error) {
        throw new Error("Can't read Doctor");
    }
});
exports.readDoctor = readDoctor;
