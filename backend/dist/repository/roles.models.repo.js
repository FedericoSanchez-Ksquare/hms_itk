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
exports.createRole = void 0;
const roles_1 = require("../models/roles");
const createRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRole = yield roles_1.roles.create({
            role,
        });
        console.log("Role created with id= " + newRole.id);
        return newRole.id;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createRole = createRole;
