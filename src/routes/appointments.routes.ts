import { Router, Request, Response } from "express";
import { 
  createAppointments,
  updatesTime, 
  deleteAppointments, 
  readAppointmentsPatient,
  listAppointmentsPatient,
  readAppointmentsDoctor,
  listAppointmentsDoctor,
  listAllAppointments
} from "../repository/appointments.models.repo";
import { hasRole } from "../middlewares/hasRoles";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const AppointmentRouter = Router();

AppointmentRouter.post("/create",
  isAuthenticated,
  hasRole({ roles: ["admin"], allowSameUser: true }), 
  async (req: Request, res: Response) => {
  const { appointmentDate, appointmentDetails,appointmentTime, is_deleted,patientId,doctorId } = req.body;
  try {
    const newAppointmentId = await createAppointments(appointmentDate, appointmentDetails,appointmentTime, is_deleted,patientId,doctorId);
    res.statusCode = 201;
    res.send({
      id: newAppointmentId,
      message: "Appointment created with ID= " + newAppointmentId
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});



AppointmentRouter.get("/findAppointmentsPatient/:patientId",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}), 
   async (req: Request, res: Response) => {
  const { patientId } = req.params;
  try {
    const readAppointment = await readAppointmentsPatient(+patientId)
    res.statusCode = 201;
    res.json({
    id: readAppointment,
    message: "Appointments for patient with ID= " + patientId
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});

AppointmentRouter.get("/listAppointmentsPatient/:patientId",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}), 
  async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const {limit, offset} = req.query
  try {
    const listAppointment = await listAppointmentsPatient(+patientId, limit ? +limit : 10, offset ? +offset : 0)
    res.statusCode = 201;
    res.json({
      id: listAppointment,
      message: "Appointments for patient with ID=" + patientId
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});

AppointmentRouter.get("/findAppointmentsDoctor/:doctorId",
isAuthenticated,
hasRole(
  {roles: ["admin"],
  allowSameUser: true}), 
  async (req: Request, res: Response) => {
  const { doctorId } = req.params;
  try {
    const readAppointmentDoctors = await readAppointmentsDoctor(+doctorId)
    res.statusCode = 201;
    res.json({
      id: readAppointmentDoctors,
      message: "Appointments for doctor with ID= "+ doctorId
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});

AppointmentRouter.get("/listAppointmentsDoctor/:doctorId",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}),  async (req: Request, res: Response) => {
  const { doctorId } = req.params;
  const {filter, value, order} = req.query
  try {
    const listAppointmentsDoctors = await listAppointmentsDoctor(+doctorId, filter ? filter : "id", value ? value :"", order ? order: "ASC" )
    res.statusCode = 201;
    res.json({
      id: listAppointmentsDoctors,
      message: "Appointments for doctor with ID= " +doctorId
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});
AppointmentRouter.get("/allAppointments",
  isAuthenticated,
  hasRole({ roles: ["admin"], allowSameUser: false }),
  async (req: Request, res: Response) => {
    const {id,filter, value, order,limit, offset} = req.query
    try {
      const readAppointment = 
      await listAllAppointments(id? +id: 0,filter ? filter : "id",  value ? value :"false", order ? order: "ASC", limit ? +limit : 10, offset ? +offset : 0 )
      res.statusCode = 200;
      res.json({
        id: readAppointment,
        message: "Show all appointments"
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "something went wrong" });
    }
});

AppointmentRouter.patch("/updateAppointmentTime",
isAuthenticated,
  hasRole({ roles: ["admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
  const {id,appointmentDate, appointmentTime} = req.body;
  try {
    const updatedTime = await updatesTime(id, appointmentDate, appointmentTime);
    res.statusCode = 201;
    res.send({
      id: updatedTime,
      message: "Time on appointment updated"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});

AppointmentRouter.patch("/disableAppointment", 
isAuthenticated,
  hasRole({ roles: ["admin"], allowSameUser: true }),
async (req: Request, res: Response)=>{
  const {id, is_deleted} = req.body;
  try {
    const deleted = await deleteAppointments(id, true)
    res.statusCode = 201;
    res.send({
      id: deleted,
      message: "Appointment disbled with ID= " + deleted
  });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});
AppointmentRouter.patch("/enableAppointment",
isAuthenticated,
  hasRole({ roles: ["admin"], allowSameUser: true }),
async (req: Request, res: Response)=>{
  const {id, is_deleted} = req.body;
  try {
    const deleted = await deleteAppointments(id, false)
    res.statusCode = 201;
    res.send({
      id: deleted,
      message: "Appointment enabled with ID= " + deleted
  });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});

