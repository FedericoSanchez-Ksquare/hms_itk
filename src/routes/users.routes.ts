import { Router, Request, Response } from "express";
import {createUserFB, disableUserFB, getAllUsers,readUser} from "../firebase/methods";
import { hasRole } from "../middlewares/hasRoles";
import { isAuthenticated } from "../middlewares/isAuthenticated";


export const UserRouter = Router();
//create user patient
UserRouter.post("/patient", async (req: Request, res: Response) => {
  const { displayName,email,password } = req.body;
  try {
    if(!email || !password)
    {
      res.statusCode = 400;
      res.send({
        message: "Missing fields"
      })
    }
    else{
      const newUserId = await createUserFB(displayName,email, password,"patient", false );
      res.statusCode = 201;
      res.send(newUserId);
    }
  } catch (error) {
   return res.status(500).send({ error: "Couldn't create patient" });
  }
});

//creates user admin
UserRouter.post("/admin", 
isAuthenticated,
hasRole(
  {roles: [""],
   allowSameUser:false}), async (req: Request, res: Response) => {
  const { displayName,email,password } = req.body;
  try {
    const newUserId = await createUserFB(displayName,email, password,"admin", false );
    res.statusCode = 201;
    res.send(newUserId);
  } catch (error) {
    return res.status(500).send({ error: "Couldn't create admin" });
  }
});
// creates user doctor
UserRouter.post("/doctor",
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:false}), async (req: Request, res: Response) => {
  const { displayName,email,password } = req.body;
  try {
    const newUserId = await createUserFB(displayName,email, password,"doctor", false );
    res.statusCode = 201;
    res.send(newUserId);
  } catch (error) {
    return res.status(500).send({ error: "Couldn't create doctor" });
  }
});
//lists users
UserRouter.get("/:userId?",

  async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      if(userId === null || userId === undefined){
        const users = await getAllUsers();
        res.status(200).send(users);
      }
      else{
        const users = await readUser(userId ? userId:"");
        res.status(200).send(users);
      }
    } catch (error) {
      res.status(500).send({ error: "Couldnt get user" });
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
    res.statusCode = 200;
    res.send({
    id: disabledUserFB,
    message: "User state updated"
  });
  } catch (error) {
    return res.status(500).send({ error: "Couldn't disable user" });
  }
});

