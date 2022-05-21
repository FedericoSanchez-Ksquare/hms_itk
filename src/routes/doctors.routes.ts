import { Router, Request, Response } from "express";
import { createDoctor,readDoctors } from "../repository/doctor.models.repo";

export const DoctorRouter = Router();

DoctorRouter.post("/createDoctor", async (req: Request, res: Response) => {
  const { medicalSpeciality, userId } = req.body;
  const newDoctorId = await createDoctor(medicalSpeciality, userId);

  res.statusCode = 201;
  res.send({
    id: newDoctorId,
  });
});

DoctorRouter.get("/showDoctor", async (req: Request, res: Response) => {
  const readDoctor = await readDoctors(req.body.id)
  res.statusCode = 201;
  res.json({
    doctors: readDoctor,
  });
});