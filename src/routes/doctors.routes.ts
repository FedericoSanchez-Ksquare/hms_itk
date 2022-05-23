import { Router, Request, Response } from "express";
import { createDoctor,readDoctors } from "../repository/doctor.models.repo";
import {createUserFB, disableUserFB} from "../firebase/methods";
import { hasRole } from "../middlewares/hasRoles";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const DoctorRouter = Router();

DoctorRouter.post("/createDoctor",isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}),  async (req: Request, res: Response) => {
  const { medicalSpeciality, userId } = req.body;
  const newDoctorId = await createDoctor(medicalSpeciality, userId);

  res.statusCode = 201;
  res.send({
    id: newDoctorId,
  });
});

// DoctorRouter.get("/showDoctor", 
// isAuthenticated,
// hasRole(
//   {roles: ["admin"],
//    allowSameUser:false}), async (req: Request, res: Response) => {
//   const readDoctor = await readDoctors(req.body.id)
//   res.statusCode = 201;
//   res.json({
//     doctors: readDoctor,
//   });
// });

DoctorRouter.get("/showDoctor", async (req: Request, res: Response) => {
  const readDoctor = await readDoctors(req.body.id)
  res.statusCode = 201;
  res.json({
    doctors: readDoctor,
  });
});