import { Router, Request, Response } from "express";
import { createPatient,readPatients } from "../repository/patients.models.repo";

export const PatientRouter = Router();

PatientRouter.post("/createPatient", async (req: Request, res: Response) => {
  const { birth, weigth, height, gender, address, userId } = req.body;
  const newPatientId = await createPatient(birth, weigth, height, gender, address,userId );

  res.statusCode = 201;
  res.send({
    id: newPatientId,
  });
});

PatientRouter.get("/showPatient", async (req: Request, res: Response) => {
  const readPatient = await readPatients(req.body.id)
  res.statusCode = 201;
  res.json({
    patients: readPatient,
  });
});