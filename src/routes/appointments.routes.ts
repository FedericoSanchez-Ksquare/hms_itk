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
AppointmentRouter.post("/",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}), 
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

//list patient appointments
AppointmentRouter.get("/patients/:patientId",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}), 
  async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const {limit, offset} = req.query
  try {
    const listAppointment = await listAppointmentsPatient(+patientId, limit ? +limit : 10, offset ? +offset : 0)
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
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});

//list doctors appointments
AppointmentRouter.get("/doctors/:doctorId",
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
    res.json({
      id: listAppointmentsDoctors,
      message: "Appointments for doctor with ID= " +doctorId
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
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
      const readAppointment = await listAllAppointments(queryParams,orderBy ? orderBy: "id", order ? order: "ASC", limit ? +limit : 10, offset ? +offset : 0 )
      res.statusCode = 200;
      res.send(readAppointment);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "something went wrong" });
    }
});

AppointmentRouter.get("/:id",
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
    console.log(error);
    
  }
  
 });

// updates appointments
AppointmentRouter.patch("/:id",
isAuthenticated,
hasRole(
  {roles: ["admin"],
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
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});

