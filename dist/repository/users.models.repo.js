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
exports.disableUsers = exports.readUsers = void 0;
const user_1 = require("../models/user");
const readUsers = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readUser = yield user_1.user.findAll();
        return readUser;
    }
    catch (error) {
        throw new Error("Couldn't read user");
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
        throw new Error("Couldn't disable user");
    }
});
exports.disableUsers = disableUsers;
