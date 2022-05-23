import { Request, Response } from "express";
import { Role } from "../types";
// isAuthorized

export const hasRole = (options: { roles: Role[]; allowSameUser: boolean }) => {
  return (req: Request, res: Response, next: Function) => {
    const { uid, email, role,patientId } = res.locals;
    const { userId } = req.params;

    if (email === process.env.SUPER_USER) {
      return next();
    }

    if (options.allowSameUser && userId && userId === uid) {
      return next();
    }
    if (!role) {
      return res.status(403).send();
    }

    if (options.roles.includes(role)) {
      return next();
    }

    return res.status(403).send();
  };
};