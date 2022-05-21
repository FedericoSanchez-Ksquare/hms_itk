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
exports.RolesRouter = void 0;
const express_1 = require("express");
const roles_models_repo_1 = require("../repository/roles.models.repo");
exports.RolesRouter = (0, express_1.Router)();
exports.RolesRouter.post("/createRole", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body;
    const newRoleId = yield (0, roles_models_repo_1.createRole)(role);
    res.statusCode = 201;
    res.send({
        id: newRoleId,
    });
}));
