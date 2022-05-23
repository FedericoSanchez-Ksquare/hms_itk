import { Router, Request, Response } from "express";
import { 
  createAppointments, 
  readAppointments, 
  updatesTime, 
  deleteAppointments, 
  readAppointmentsPatient,
  listAppointmentsPatient,} from "../repository/appointments.models.repo";
import { hasRole } from "../middlewares/hasRoles";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const AppointmentRouter = Router();

AppointmentRouter.post("/create", async (req: Request, res: Response) => {
  const { appointmentDate, appointmentDetails,appointmentTime, is_deleted,patientId,doctorId } = req.body;
  const newAppointmentId = await createAppointments(appointmentDate, appointmentDetails,appointmentTime, is_deleted,patientId,doctorId);

  res.statusCode = 201;
  res.send({
    id: newAppointmentId,
  });
});

AppointmentRouter.get("/read", async (req: Request, res: Response) => {
  const readAppointment = await readAppointments(req.body.id)
  res.statusCode = 201;
  res.json({
    appointment: readAppointment,
  });
});

AppointmentRouter.get("/:userId",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}), 
   async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { patientId , doctorId } = req.body;
  
  const readAppointment = await readAppointmentsPatient(userId,patientId,doctorId)
  res.statusCode = 201;
  res.json({
    desc: readAppointment,
  });
});

AppointmentRouter.get("/readListPatient",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}), async (req: Request, res: Response) => {
  const { patientId , doctorId  } = req.body;
  const listAppointment = await listAppointmentsPatient(patientId,doctorId)
  res.statusCode = 201;
  res.json({
    desc: listAppointment,
  });
});

//No se que hice aqui pero esta embrujado y siempre busca al fantasma de
// patientid y le vale el doctorid

// AppointmentRouter.get("/readDoctor",
// isAuthenticated,
// hasRole(
//   {roles: ["admin"],
//    allowSameUser:true}), async (req: Request, res: Response) => {
//   const { doctorId } = req.body;
//   const readAppointmentDoctors = await readAppointmentsDoctor(doctorId)
//   res.statusCode = 201;
//   res.json({
//     desc: readAppointmentDoctors,
//   });
// });

// AppointmentRouter.get("/listDoctor",
// isAuthenticated,
// hasRole(
//   {roles: ["admin"],
//    allowSameUser:true}),  async (req: Request, res: Response) => {
//   const { doctorId } = req.body;
//   const listAppointmentsDoctors = await listAppointmentsDoctor(doctorId)
//   res.statusCode = 201;
//   res.json({
//     appointmentDoctor: listAppointmentsDoctors,
//   });
// });

AppointmentRouter.patch("/updateTime", async (req: Request, res: Response) => {
  const {id,appointmentDate, appointmentTime} = req.body;
  const updatedTime = await updatesTime(id, appointmentDate, appointmentTime);

  res.statusCode = 201;
  res.send({
    id: updatedTime,
  });
});

AppointmentRouter.patch("/delete", async (req: Request, res: Response)=>{
  const {id, is_deleted} = req.body;
  const deleted = await deleteAppointments(id, is_deleted)
    res.statusCode = 201;
  res.send({
    id: deleted,
  });
});

