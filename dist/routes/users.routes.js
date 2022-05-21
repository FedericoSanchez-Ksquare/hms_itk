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
exports.UserRouter = void 0;
const express_1 = require("express");
const users_models_repo_1 = require("../repository/users.models.repo");
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, password, email, is_active, roleId } = req.body;
    const newUserId = yield (0, users_models_repo_1.createUser)(firstName, lastName, password, email, is_active, roleId);
    res.statusCode = 201;
    res.send({
        id: newUserId,
    });
}));
exports.UserRouter.get("/showUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readUser = yield (0, users_models_repo_1.readUsers)(req.body.id);
    res.statusCode = 201;
    res.json({
        users: readUser,
    });
}));
