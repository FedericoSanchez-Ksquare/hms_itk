import { Router, Request, Response } from "express";
import { 
  createAppointments,
  listAppointmentsPatient,
  listAppointmentsDoctor,
  listAllAppointments,
  findAppointment,
  updateAppointment
} from "../repository/appointments.models.repo";
import { hasRole } from "../middlewares/hasRoles";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const AppointmentRouter = Router();

//creates appointments
AppointmentRouter.post("/:userId",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}), 
  async (req: Request, res: Response) => {
  const { appointmentDate, appointmentDetails,appointmentTime,patientId,doctorId } = req.body;
  try {
    const newAppointment = await createAppointments(appointmentDate, appointmentDetails,appointmentTime, false,patientId,doctorId);
    res.status(201).send(newAppointment);
  } catch (error) {
    return res.status(500).send({ error: "Couldn't create appointments" });
  }
});

//list patient appointments
AppointmentRouter.get("/patients/:userId/:patientId",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}), 
  async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const {limit, offset, is_deleted} = req.query
  let queryParams = {
    is_deleted
  }
  try {
    const listAppointment = await listAppointmentsPatient(+patientId, queryParams, limit ? +limit : 100, offset ? +offset : 0)
    if(listAppointment === "Invalid id")
    {
      res.statusCode = 400;
      res.json({
        message: listAppointment
      })
    }else{
      res.statusCode = 200;
      res.send(listAppointment);
    }
  } catch (error) {
    return res.status(500).send({ error: "Couldn't find patient appointments" });
  }
});

//list doctors appointments
AppointmentRouter.get("/doctors/:userId/:doctorId",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}), 
  async (req: Request, res: Response) => {
  const { doctorId } = req.params;
  const {orderBy, order,appointmentDate, appointmentTime, is_deleted, patientId } = req.query
  let queryParams = {
    appointmentDate,
    appointmentTime,
    is_deleted,
    patientId
  }
  try {
    const listAppointmentsDoctors = await listAppointmentsDoctor(+doctorId, queryParams, order ? order: "ASC", orderBy ? orderBy: "id" )
    res.statusCode = 200;
    res.json( listAppointmentsDoctors);
  } catch (error) {
    return res.status(500).send({ error: "Couldn't find doctor appointments" });
  }
});
//shows all appointments or filter appointments
AppointmentRouter.get("/all",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}), 
  async (req: Request, res: Response) => {
    const {orderBy, order,appointmentDate, appointmentTime, is_deleted, patientId, doctorId,limit,offset} = req.query
    let queryParams = {
    appointmentDate,
    appointmentTime,
    is_deleted,
    patientId,
    doctorId
  }
    try {
      const readAppointment = await listAllAppointments(queryParams,orderBy ? orderBy: "id", order ? order: "ASC", limit ? +limit : 100, offset ? +offset : 0 )
      res.statusCode = 200;
      res.send(readAppointment);
    } catch (error) {
      return res.status(500).send({ error: "Couldn't find appointments" });
    }
});

AppointmentRouter.get("/:userId/:id",
isAuthenticated,hasRole(
  {roles: ["admin"],
  allowSameUser:true}),
 async (req:Request, res: Response) => {
  const {id} = req.params
  try {
    const readAppointment = await findAppointment(+id)
    if(readAppointment === "Invalid id")
    {
      res.statusCode = 400;
      res.json({
        message: readAppointment
      })
    }
    else{
      res.statusCode = 200;
      res.send(readAppointment)
    }

  } catch (error) {
    return res.status(500).send({ error: "Couldn't get appointment" });
  }
  
 });

// updates appointments
AppointmentRouter.patch("/:userId/:id",
isAuthenticated,
hasRole(
  {roles: ["admin","doctor"],
   allowSameUser:true}), 
async (req: Request, res: Response)=>{
  const {id} = req.params;
  const {is_deleted, appointmentDate, appointmentTime} = req.body
  const payload = {is_deleted, appointmentDate, appointmentTime}
  try {
    const deleted = await updateAppointment(+id, payload)
    res.statusCode = 200;
    res.send(deleted);
  } catch (error) {
    return res.status(500).send({ error: "Couldn't update appointment" });
  }
});

