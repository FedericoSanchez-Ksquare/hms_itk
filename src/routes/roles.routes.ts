import { Router, Request, Response } from "express";
import { createRole } from "../repository/roles.models.repo";

export const RolesRouter = Router();

RolesRouter.post("/createRole", async (req: Request, res: Response) => {
  const { role} = req.body;
  const newRoleId = await createRole(role);

  res.statusCode = 201;
  res.send({
    id: newRoleId,
  });
});
