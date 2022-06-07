import { Router, Request, Response } from "express";
import {createUserFB, disableUserFB, getAllUsers} from "../firebase/methods";
import { hasRole } from "../middlewares/hasRoles";
import { isAuthenticated } from "../middlewares/isAuthenticated";


export const UserRouter = Router();
UserRouter.post("/createUser", async (req: Request, res: Response) => {
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
    message: "General user created"
  });
  } catch (error) {
    console.log(error);
  }
});
UserRouter.post("/createAdmin", 
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

UserRouter.post("/createUserDoctor", async (req: Request, res: Response) => {
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

UserRouter.get("/",
  async (req: Request, res: Response) => {
    try {
      const users = await getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "something went wrong" });
    }
  }
);
UserRouter.delete("/:userId", 
isAuthenticated,
hasRole(
  {roles: ["admin"],
   allowSameUser:true}),
  async (req: Request, res: Response) => {
  const { userId } = req.params;
  const {isDisabled} = req.body;
  if (isDisabled === undefined || isDisabled === null) {
      return res.status(400).send({
        error: "no fields to update",
      });
    }
  try {
    const disabledUserFB = await disableUserFB(userId, isDisabled );
    res.statusCode = 201;
    res.send({
    id: disabledUserFB,
    message: "User updated"
  });
  } catch (error) {
    console.log(error);
  }
});

