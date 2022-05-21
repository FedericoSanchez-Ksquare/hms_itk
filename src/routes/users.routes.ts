import { Router, Request, Response } from "express";
import { createUser,readUsers } from "../repository/users.models.repo";


export const UserRouter = Router();

UserRouter.post("/createUser", async (req: Request, res: Response) => {
  const { firstName, lastName,password,email,is_active,roleId } = req.body;
  const newUserId = await createUser(firstName, lastName, password,email, is_active, roleId );

  res.statusCode = 201;
  res.send({
    id: newUserId,
  });
});

UserRouter.get("/showUser", async (req: Request, res: Response) => {
  const readUser = await readUsers(req.body.id)
  res.statusCode = 201;
  res.json({
    users: readUser,
  });
});





