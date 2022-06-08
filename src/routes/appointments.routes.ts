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
  // I see that you are using very often hasRole with roles: ["admin"], in almost all the endpoints, why?
  hasRole({ roles: ["admin"], allowSameUser: true }), 
  async (req: Request, res: Response) => {
  // Why are you asking for is_deleted when you create an appointment? is that possible given the business rules?
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
    res.statusCode = 201; // Please change to 200
    res.json({
    // This is a little bit confusing because, here you are returning the info
    // inside "id" property, but you are not returning an id, you are fetching information/data
    id: readAppointment,
    message: "Appointments for patient with ID= " + patientId
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});

// Please try to reduce the amount of GET endpoints into 1 or 2 endpoints at maximum
AppointmentRouter.get("/listAppointmentsPatient/:patientId",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}), 
  async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const {limit, offset} = req.query
  try {
    // Would be great to create an interface or something similar to handle a pagination object
    const listAppointment = await listAppointmentsPatient(+patientId, limit ? +limit : 10, offset ? +offset : 0)
    res.statusCode = 201; // Please change to 200
    res.json({
      id: listAppointment, // Same comment as in /findAppointmentsPatient/:patientId endpoint
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
    res.statusCode = 201; // Please change to 200
    res.json({
      id: readAppointmentDoctors, // Same comment as in /findAppointmentsPatient/:patientId endpoint
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
    res.statusCode = 201; // Please change to 200
    res.json({
      id: listAppointmentsDoctors, // Same comment as in /findAppointmentsPatient/:patientId endpoint
      message: "Appointments for doctor with ID= " +doctorId
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});
// Please change this endpoint to accept none, one or multiple query params at the same time
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
        id: readAppointment, // Same comment as in /findAppointmentsPatient/:patientId endpoint
        message: "Show all appointments"
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "something went wrong" });
    }
});
// Please use a single endpoint to update any field of an appointment

// All your endpoint and methods inside it have reference to only update time,
// but you can update both date and time. Please watch out on the names of your variables, methods,
// and messages, remember to be specific in what you are building, because in a team project,
// when someone else reads your code, will be easier to understand what is happening
AppointmentRouter.patch("/updateAppointmentTime",
isAuthenticated,
  hasRole({ roles: ["admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
  const {id,appointmentDate, appointmentTime} = req.body;
  try {
    const updatedTime = await updatesTime(id, appointmentDate, appointmentTime);
    res.statusCode = 201; // Please change to 200
    res.send({
      id: updatedTime, // Same comment as in /findAppointmentsPatient/:patientId endpoint
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
  const {id, is_deleted} = req.body; // Remove unused variables
  try {
    const deleted = await deleteAppointments(id, true)
    res.statusCode = 201; // Please change to 200
    res.send({
      id: deleted, // Same comment as in /findAppointmentsPatient/:patientId endpoint
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
  const {id, is_deleted} = req.body; // Remove unused variables
  try {
    const deleted = await deleteAppointments(id, false)
    res.statusCode = 201; // Please change to 200
    res.send({
      id: deleted, // Same comment as in /findAppointmentsPatient/:patientId endpoint
      message: "Appointment enabled with ID= " + deleted
  });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});

