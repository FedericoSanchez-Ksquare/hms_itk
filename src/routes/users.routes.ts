import { Router, Request, Response } from "express";
import {createUserFB, disableUserFB, getAllUsers,readUser} from "../firebase/methods";
import { hasRole } from "../middlewares/hasRoles";
import { isAuthenticated } from "../middlewares/isAuthenticated";


export const UserRouter = Router();
//create user patient
UserRouter.post("/patient", async (req: Request, res: Response) => {
  const { displayName,email,password,role } = req.body;
  if (role !== "patient") {
    return res.status(400).send({
      Error: "Invalid Role"
    })
  }
  try {
    const newUserId = await createUserFB(displayName,email, password,role, false );
    res.statusCode = 201;
    res.send({
    id: newUserId,
    message: "Patient user created"
  });
  } catch (error) {
    console.log(error);
  }
});

//creates user admin
UserRouter.post("/admin", 
isAuthenticated,
hasRole(
  {roles: [""],
   allowSameUser:false}), async (req: Request, res: Response) => {
  const { displayName,email,password,role } = req.body;
  if (role !== "admin") {
    return res.status(400).send({
      Error: "Invalid Role"
    })
  }
  try {
    const newUserId = await createUserFB(displayName,email, password,role, false );
    res.statusCode = 201;
    res.send({
    id: newUserId,
    message: "Admin user created"
  });
  } catch (error) {
    console.log(error);
  }
});
// creates user doctor
UserRouter.post("/doctor", async (req: Request, res: Response) => {
  const { displayName,email,password,role } = req.body;

  if (role !== "doctor") {
    return res.status(400).send({
      Error: "Invalid Role"
    })
  }
  try {
    const newUserId = await createUserFB(displayName,email, password,role, false );
    res.statusCode = 201;
    res.send({
    id: newUserId,
    message: "Doctor user created"
  });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "something went wrong" });
  }
});

UserRouter.get("/:uid?",
  async (req: Request, res: Response) => {
    const { uid } = req.params;
    try {
      if(uid === null || uid === undefined){
        const users = await getAllUsers();
        res.status(200).send(users);
      }
      else{
        const users = await readUser(uid ? uid:"");
        res.status(200).send(users);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "something went wrong" });
    }
  }
);

//enable disables users
UserRouter.delete("/:userId", 
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}),
  async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const disabledUserFB = await disableUserFB(userId);
    res.statusCode = 201;
    res.send({
    id: disabledUserFB,
    message: "User state updated"
  });
  } catch (error) {
    console.log(error);
  }
});

