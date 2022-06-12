import { user } from "../models/user";

export const createUser = async (firstName: string, lastName: string, password: string, email: string,is_active:boolean, roleId: number ) => {
  try {
    const newUser = await user.create({
      firstName, lastName, password,email,is_active, roleId
    });
    console.log("User created with id= "+newUser.id);
    return newUser.id;
  } catch (error) {
    console.error(error);
  }
};

export const readUsers = async(
  uid: string
) => {
  try {
    const readUser = await user.findAll();
    return readUser

  } catch (error) {
    console.log(error)
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
    console.log(error);
    
  }
}