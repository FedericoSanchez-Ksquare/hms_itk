import { Router, Request, Response } from "express";
import { createUser,readUsers,disableUsers } from "../repository/users.models.repo";
import {createUserFB, disableUserFB} from "../firebase/methods";
import { hasRole } from "../middlewares/hasRoles";
import { isAuthenticated } from "../middlewares/isAuthenticated";


export const UserRouter = Router();
UserRouter.post("/createUserFB", async (req: Request, res: Response) => {
  const { displayName,email,password,role } = req.body;
  
  try {
    const newUserId = await createUserFB(displayName,email, password,role,false );
    
    res.statusCode = 201;
    res.send({
    id: newUserId +" user fb",
  });
  } catch (error) {
    console.log(error);
    
  }
});

UserRouter.post("/createUser", async (req: Request, res: Response) => {
  const { firstName, lastName,password,email,is_active,roleId } = req.body;
  const newUserId = await createUser(firstName, lastName, password,email,is_active, roleId );

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
  //const disabledUser = await disableUsers(id, is_active );
  const disabledUserFB = await disableUserFB(userId, isDisabled );
  res.statusCode = 201;
  res.send({
    //id: disabledUser,
    id2: disabledUserFB
  });
});





//eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5N2Q3ZmI1ZGNkZThjZDA0OGQzYzkxNThiNjIwYjY5MTA1MjJiNGQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoibG1hbyIsInJvbGUiOiJkb2N0b3IiLCJpc0Rpc2FibGVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2l0ay1obXMiLCJhdWQiOiJpdGstaG1zIiwiYXV0aF90aW1lIjoxNjUzMjQzNDQ3LCJ1c2VyX2lkIjoibVhsbFl2Q0h2dE91QXRqNjFhNFRaaU5KNlRKMiIsInN1YiI6Im1YbGxZdkNIdnRPdUF0ajYxYTRUWmlOSjZUSjIiLCJpYXQiOjE2NTMyNDM0NDcsImV4cCI6MTY1MzI0NzA0NywiZW1haWwiOiJicmF1bGlvZG9jdG9yQGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImJyYXVsaW9kb2N0b3JAaG90bWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.R3VxBKD10KefVLL0oQfI3tSGC9sx73aIOaRHhJ0pZPIkrhgo9RS5Vmn1NKQIKTpUo60YXt36T-3CJT9jByCNB7c2Xu8EijYe5G1EHPDoPUrNx8FD4J6hC0uPekUnH62FheTc0ewD7uT6_aho1UORicNXVkXjKXZwnwpdd1zUa4IlxK71F4Vp5tpuVhoxY1JBcXmoTtsswPtq1xg9DE9akucKWBhV4zM3t9mS8W1GY3x_IaT6lWYyM0377PmxDGbYH3vvrqCVDemgxVhfM-_BHXYCYB50q81-joUfm8Yp_ttvM8col-8ZJHCcv-6q3fvAHyCYo5GUC1UgurUNdDFLQw

