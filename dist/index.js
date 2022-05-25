"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const users_routes_1 = require("./routes/users.routes");
const appointments_routes_1 = require("./routes/appointments.routes");
const doctors_routes_1 = require("./routes/doctors.routes");
const patients_routes_1 = require("./routes/patients.routes");
const admin = __importStar(require("firebase-admin"));
dotenv_1.default.config();
admin.initializeApp();
//inicar sequelize primero y luego la api
const app = (0, express_1.default)();
const port = process.env.PORT;
const db_name = process.env.DB_NAME;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOSTNAME;
// Middlewares //
app.use(express_1.default.json());
// Routes //
app.use("/users", users_routes_1.UserRouter);
app.use("/patient", patients_routes_1.PatientRouter);
app.use("/doctor", doctors_routes_1.DoctorRouter);
app.use("/appointment", appointments_routes_1.AppointmentRouter);
app.get("/", (req, res) => {
    res.send(req.originalUrl);
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, models_1.startSequelize)(db_name, db_password, db_host, db_username);
        console.log("Up and running!!!");
    }
    catch (error) {
        console.error(error);
        process.abort();
    }
}));
