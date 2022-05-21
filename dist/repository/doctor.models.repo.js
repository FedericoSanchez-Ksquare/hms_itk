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
exports.readDoctors = exports.createDoctor = void 0;
const doctor_1 = require("../models/doctor");
const createDoctor = (medicalSpeciality, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDoctor = yield doctor_1.doctor.create({
            medicalSpeciality, userId
        });
        console.log("Doctor created with id= " + newDoctor.id);
        return newDoctor.id;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createDoctor = createDoctor;
const readDoctors = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id) {
            const readDoctor = yield doctor_1.doctor.findByPk(id);
            return readDoctor;
        }
        else {
            const readDoctor = yield doctor_1.doctor.findAll();
            return readDoctor;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.readDoctors = readDoctors;
