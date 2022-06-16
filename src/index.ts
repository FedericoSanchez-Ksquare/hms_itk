import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { startSequelize } from "./models";
import { UserRouter } from "./routes/users.routes";
import { AppointmentRouter } from "./routes/appointments.routes";
import { DoctorRouter} from "./routes/doctors.routes";
import { PatientRouter } from "./routes/patients.routes";
import * as admin from "firebase-admin"
import cors from 'cors'

dotenv.config();
admin.initializeApp();

const app = express();

const port = process.env.PORT;
const db_name = <string>process.env.DB_NAME;
const db_username = <string>process.env.DB_USERNAME;
const db_password = <string>process.env.DB_PASSWORD;
const db_host = <string>process.env.DB_HOSTNAME;

app.use(cors());
app.use(express.json());


app.use("/users", UserRouter);
app.use("/patient", PatientRouter);
app.use("/doctor", DoctorRouter);
app.use("/appointment", AppointmentRouter);


app.listen(port, async () => {
  try {
    startSequelize(db_name, db_password, db_host, db_username);
    console.log("Up and running!!!");

  } catch (error) {
    console.error(error);
    process.abort();
  }
});

 