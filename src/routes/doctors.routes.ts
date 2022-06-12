import { Router, Request, Response } from "express";
import { createDoctor,readDoctors } from "../repository/doctor.models.repo";
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
  const { medicalSpeciality, userId } = req.body;
  try {
    const newDoctorId = await createDoctor(medicalSpeciality, userId);
    res.statusCode = 201;
    res.send({
      id: newDoctorId,
      messages: "User doctor created with ID= " + newDoctorId
    });
  } catch (error) {
    console.log(error);
  }
});

//shows list of doctors
DoctorRouter.get("/",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser: false}),  async (req: Request, res: Response) => {
  const readDoctor = await readDoctors(req.body.id)
  res.statusCode = 200;
  res.json({
    id: readDoctor,
    messages: "Registered doctors:"
  });
});