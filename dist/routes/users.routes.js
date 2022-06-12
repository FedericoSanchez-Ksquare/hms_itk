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
const methods_1 = require("../firebase/methods");
const hasRoles_1 = require("../middlewares/hasRoles");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
exports.UserRouter = (0, express_1.Router)();
//create user patient
exports.UserRouter.post("/patient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, email, password, role } = req.body;
    if (role !== "patient") {
        return res.status(400).send({
            Error: "Invalid Role"
        });
    }
    try {
        const newUserId = yield (0, methods_1.createUserFB)(displayName, email, password, role, false);
        res.statusCode = 201;
        res.send({
            id: newUserId,
            message: "Patient user created"
        });
    }
    catch (error) {
        console.log(error);
    }
}));
//creates user admin
exports.UserRouter.post("/admin", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: [""],
    allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, email, password, role } = req.body;
    if (role !== "admin") {
        return res.status(400).send({
            Error: "Invalid Role"
        });
    }
    try {
        const newUserId = yield (0, methods_1.createUserFB)(displayName, email, password, role, false);
        res.statusCode = 201;
        res.send({
            id: newUserId,
            message: "Admin user created"
        });
    }
    catch (error) {
        console.log(error);
    }
}));
// creates user doctor
exports.UserRouter.post("/doctor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, email, password, role } = req.body;
    if (role !== "doctor") {
        return res.status(400).send({
            Error: "Invalid Role"
        });
    }
    try {
        const newUserId = yield (0, methods_1.createUserFB)(displayName, email, password, role, false);
        res.statusCode = 201;
        res.send({
            id: newUserId,
            message: "Doctor user created"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.UserRouter.get("/:uid?", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    try {
        if (uid === null || uid === undefined) {
            const users = yield (0, methods_1.getAllUsers)();
            res.status(200).send(users);
        }
        else {
            const users = yield (0, methods_1.readUser)(uid ? uid : "");
            res.status(200).send(users);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "something went wrong" });
    }
}));
//enable disables users
exports.UserRouter.delete("/:userId", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const disabledUserFB = yield (0, methods_1.disableUserFB)(userId);
        res.statusCode = 200;
        res.send({
            id: disabledUserFB,
            message: "User state updated"
        });
    }
    catch (error) {
        console.log(error);
    }
}));
