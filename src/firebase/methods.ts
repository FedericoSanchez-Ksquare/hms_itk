import * as admin from "firebase-admin"
import  { roles }  from '../models/roles'
import { Role } from "../types";

export const createUserFB = async(
  displayName: string,
  email: string,
  password: string,
  role: Role,
  isDisabled: boolean
) =>{
    const { uid } = await admin.auth().createUser({
    displayName,
    email,
    password,
  });

  await admin.auth().setCustomUserClaims(uid, { role, isDisabled });

  // Guardar a Postgresql -> Como van a manejar si esto falla?

  return uid;
}
const mapToUser = (user: admin.auth.UserRecord) => {
  const customClaims = (user.customClaims || { role: "" }) as { role?: string };
  const role = customClaims.role ? customClaims.role : "";

  return {
    uid: user.uid,
    email: user.email,
    userName: user.displayName,
    role,
    isDisabled: user.disabled,
  };
};

export const disableUserFB = async (uid: string, disabled: boolean) => {
  const user = await admin.auth().updateUser(uid, { disabled });
  
  return mapToUser(user);
};


