import * as admin from "firebase-admin"
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

export const disableUserFB = async (uid: string) => {
  const test = await admin.auth().getUser(uid)
  test.disabled
  if(test.disabled === false){
   const user = await admin.auth().updateUser(uid, { disabled: true });
  return mapToUser(user); 
  }else{
    const user = await admin.auth().updateUser(uid, { disabled: false });
  return mapToUser(user); 
  }
};

export const readUser = async (uid?: any) => {
  const user = await admin.auth().getUser(uid);

  return mapToUser(user);
};

export const getAllUsers = async () => {
  const listAllMyUsers = await admin.auth().listUsers(5);
  const users = listAllMyUsers.users.map(mapToUser);

  return users;
};

