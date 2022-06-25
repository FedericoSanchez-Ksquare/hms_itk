import { user } from "../models/user";


export const readUsers = async(
  uid: string
) => {
  try {
    const readUser = await user.findAll();
    return readUser

  } catch (error) {
    throw new Error("Couldn't read user");
  }
}
export const disableUsers = async(
  id: number
) =>{
  try {
    const users = await user.findByPk(id)
    if(users?.is_active.toString() === "false"){
      const disablePatient = await user.update({is_active: true}, {where:{id}})
      return disablePatient
    }else{
      const disablePatient = await user.update({is_active: false}, {where:{id}})
      return disablePatient
    }
  } catch (error) {
    throw new Error("Couldn't disable user"); 
  }
}