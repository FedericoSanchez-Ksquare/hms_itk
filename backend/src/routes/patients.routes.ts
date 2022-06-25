import { Router, Request, Response } from "express";
import { createPatient,readPatients,readPatient } from "../repository/patients.models.repo";
import { hasRole } from "../middlewares/hasRoles";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const PatientRouter = Router();
//creates user patient
PatientRouter.post("/",
   async (req: Request, res: Response) => {
  const {firstName, lastName, birth, weigth, height, gender, address, userId } = req.body;
  try {
    const newPatientId = await createPatient(firstName, lastName,birth, weigth, height, gender, address,userId );
    res.statusCode = 201;
    res.send(newPatientId);
  } catch (error) {
    return res.status(500).send({ error: "Couln't create patient" });
  }
});

// lists the patients
PatientRouter.get("/:userId?",
  isAuthenticated,
  hasRole({ roles: ["admin"], allowSameUser: true }), 
  async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    if(userId === null || userId === undefined){
    const listPatients = await readPatients()
    res.status(200).send(listPatients);
    }else{
      const patient = await readPatient(userId ? userId:"")
      res.status(200).send(patient);
    }
  } catch (error) {

    return res.status(500).send({ error: "Couldn't get patients" });
  }
});