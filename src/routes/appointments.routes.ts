import { Router, Request, Response } from "express";
import { createAppointments, readAppointments } from "../repository/appointments.models.repo";

export const AppointmentRouter = Router();

AppointmentRouter.post("/create", async (req: Request, res: Response) => {
  const { appointmentDate, appointmentDetails,patientId,doctorId } = req.body;
  const newAppointmentId = await createAppointments(appointmentDate, appointmentDetails,patientId,doctorId);

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