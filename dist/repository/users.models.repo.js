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
exports.disableUsers = exports.readUsers = exports.createUser = void 0;
const user_1 = require("../models/user");
const createUser = (firstName, lastName, password, email, is_active, roleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield user_1.user.create({
            firstName, lastName, password, email, is_active, roleId
        });
        console.log("User created with id= " + newUser.id);
        return newUser.id;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createUser = createUser;
const readUsers = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readUser = yield user_1.user.findAll();
        return readUser;
    }
    catch (error) {
        console.log(error);
    }
});
exports.readUsers = readUsers;
const disableUsers = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.user.findByPk(id);
        if ((users === null || users === void 0 ? void 0 : users.is_active.toString()) === "false") {
            const disablePatient = yield user_1.user.update({ is_active: true }, { where: { id } });
            return disablePatient;
        }
        else {
            const disablePatient = yield user_1.user.update({ is_active: false }, { where: { id } });
            return disablePatient;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.disableUsers = disableUsers;
