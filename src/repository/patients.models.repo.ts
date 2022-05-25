import { where } from "sequelize/types";
import { patient } from "../models/patient";


export const createPatient = async (birth: string, weigth: number, height: number, gender: string, address:string, userId: string ) => {
  try {
    const newPatient = await patient.create({
      birth, weigth, height, gender, address, userId// esto es UID DE FIREBASE
    });
    console.log("Patient created with id= "+newPatient.id);
    return newPatient.id;
  } catch (error) {
    console.error(error);
  }
};

export const readPatients = async(
  id: number
) => {
  try {
    if(id){
      const readPatient = await patient.findByPk(id);
      return readPatient
    }else{
      const readPatient = await patient.findAll();
      return readPatient
    }
  } catch (error) {
    console.log(error)
  }
}
