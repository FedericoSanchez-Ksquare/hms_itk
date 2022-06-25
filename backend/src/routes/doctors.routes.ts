import { Router, Request, Response } from "express";
import { createDoctor,readDoctors, readDoctor } from "../repository/doctor.models.repo";
import { hasRole } from "../middlewares/hasRoles";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const DoctorRouter = Router();

//creates doctor
DoctorRouter.post("/",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser: false}), 
   async (req: Request, res: Response) => {
  const { firstName, lastName,medicalSpeciality, userId } = req.body;
  try {
    const newDoctorId = await createDoctor(firstName, lastName,medicalSpeciality, userId);
    res.statusCode = 201;
    res.send(newDoctorId);
  } catch (error) {
    res.status(500).send({ error: "Can't create doctor" });
  }
});

//shows list of doctors
DoctorRouter.get("/list/:userId?",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser: true}),  async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    if(userId === null || userId === undefined)
  {
    const listDoctors = await readDoctors()
    res.status(200).send(listDoctors);
  }
  else{
    const doctor = await readDoctor(userId? userId:"")
    res.status(200).send(doctor);
  }
  } catch (error) {
    res.status(500).send({ error: "Can't read Doctors" });
  }
});

DoctorRouter.get("/",
  async (req: Request, res: Response) => {
  try {
    const listDoctors = await readDoctors()
    res.status(200).send(listDoctors);

  } catch (error) {
    res.status(500).send({ error: "Can't read Doctors" });
  }
});

