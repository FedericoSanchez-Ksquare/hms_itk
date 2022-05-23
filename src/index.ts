import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { startSequelize } from "./models";
import { UserRouter } from "./routes/users.routes";
import { AppointmentRouter } from "./routes/appointments.routes";
import { DoctorRouter} from "./routes/doctors.routes";
import { PatientRouter } from "./routes/patients.routes";
import { RolesRouter } from "./routes/roles.routes";
import * as admin from "firebase-admin"
import  { roles }  from './models/roles'
dotenv.config();
admin.initializeApp();

//inicar sequelize primero y luego la api

const app = express();

const port = process.env.PORT;
const db_name = <string>process.env.DB_NAME;
const db_username = <string>process.env.DB_USERNAME;
const db_password = <string>process.env.DB_PASSWORD;
const db_host = <string>process.env.DB_HOSTNAME;

// Middlewares //

app.use(express.json());

// Routes //
app.use("/users", UserRouter);
app.use("/patient", PatientRouter);
app.use("/roles", RolesRouter);
app.use("/doctor", DoctorRouter);
app.use("/appointment", AppointmentRouter);


app.get("/", (req: Request, res: Response) => {
  res.send(req.originalUrl);
});

app.listen(port, async () => {
  try {
    startSequelize(db_name, db_password, db_host, db_username);
    console.log("Up and running!!!");

  } catch (error) {
    console.error(error);
    process.abort();
  }
});

 