import { Router, Request, Response } from "express";
import { createPatient,readPatients } from "../repository/patients.models.repo";
import { hasRole } from "../middlewares/hasRoles";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const PatientRouter = Router();

PatientRouter.post("/createPatient",
  isAuthenticated,
  hasRole({ roles: ["admin"], allowSameUser: true }),
   async (req: Request, res: Response) => {
  const { birth, weigth, height, gender, address, userId } = req.body;
  const newPatientId = await createPatient(birth, weigth, height, gender, address,userId );

  res.statusCode = 201;
  res.send({
    id: newPatientId,
  });
});

PatientRouter.get("/showPatient",
  isAuthenticated,
  hasRole({ roles: ["admin"], allowSameUser: true }), async (req: Request, res: Response) => {
  const readPatient = await readPatients(req.body.id)
  res.statusCode = 201;
  res.json({
    patients: readPatient,
  });
});