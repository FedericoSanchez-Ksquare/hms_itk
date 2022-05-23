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
const methods_1 = require("../firebase/methods");
const hasRoles_1 = require("../middlewares/hasRoles");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.post("/createUserFB", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, email, password, role } = req.body;
    try {
        const newUserId = yield (0, methods_1.createUserFB)(displayName, email, password, role, false);
        res.statusCode = 201;
        res.send({
            id: newUserId + " user fb",
        });
    }
    catch (error) {
        console.log(error);
    }
}));
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
exports.UserRouter.delete("/:userId", isAuthenticated_1.isAuthenticated, (0, hasRoles_1.hasRole)({ roles: ["admin"],
    allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { isDisabled } = req.body;
    if (isDisabled === undefined || isDisabled === null) {
        return res.status(400).send({
            error: "no fields to update",
        });
    }
    //const disabledUser = await disableUsers(id, is_active );
    const disabledUserFB = yield (0, methods_1.disableUserFB)(userId, isDisabled);
    res.statusCode = 201;
    res.send({
        //id: disabledUser,
        id2: disabledUserFB
    });
}));
//eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5N2Q3ZmI1ZGNkZThjZDA0OGQzYzkxNThiNjIwYjY5MTA1MjJiNGQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoibG1hbyIsInJvbGUiOiJkb2N0b3IiLCJpc0Rpc2FibGVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2l0ay1obXMiLCJhdWQiOiJpdGstaG1zIiwiYXV0aF90aW1lIjoxNjUzMjQzNDQ3LCJ1c2VyX2lkIjoibVhsbFl2Q0h2dE91QXRqNjFhNFRaaU5KNlRKMiIsInN1YiI6Im1YbGxZdkNIdnRPdUF0ajYxYTRUWmlOSjZUSjIiLCJpYXQiOjE2NTMyNDM0NDcsImV4cCI6MTY1MzI0NzA0NywiZW1haWwiOiJicmF1bGlvZG9jdG9yQGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImJyYXVsaW9kb2N0b3JAaG90bWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.R3VxBKD10KefVLL0oQfI3tSGC9sx73aIOaRHhJ0pZPIkrhgo9RS5Vmn1NKQIKTpUo60YXt36T-3CJT9jByCNB7c2Xu8EijYe5G1EHPDoPUrNx8FD4J6hC0uPekUnH62FheTc0ewD7uT6_aho1UORicNXVkXjKXZwnwpdd1zUa4IlxK71F4Vp5tpuVhoxY1JBcXmoTtsswPtq1xg9DE9akucKWBhV4zM3t9mS8W1GY3x_IaT6lWYyM0377PmxDGbYH3vvrqCVDemgxVhfM-_BHXYCYB50q81-joUfm8Yp_ttvM8col-8ZJHCcv-6q3fvAHyCYo5GUC1UgurUNdDFLQw
