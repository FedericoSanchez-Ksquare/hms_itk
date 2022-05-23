import { user } from "../models/user";
import { roles } from "../models/roles";

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
  id: number
) => {
  try {
    if(id){
      const readUser = await user.findByPk(id);
      return readUser
    }else{
      const readUser = await user.findAll();
      return readUser
    }
  } catch (error) {
    console.log(error)
  }
}
export const disableUsers = async(
  id: number, is_active: boolean
) =>{
  try {
    const disablePatient = await user.update({is_active: is_active}, {where:{id}})
    return disablePatient
  } catch (error) {
    console.log(error);
    
  }
}