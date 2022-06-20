import { patient } from "../models/patient";


export const createPatient = async (firstName: string, lastName: string, birth: string, weigth: number, height: number, gender: string, address:string, userId: string ) => {
  try {
    const newPatient = await patient.create({firstName, lastName,
      birth, weigth, height, gender, address, userId
    });
    return newPatient;
  } catch (error) {
    throw new Error("Can't create patient");
  }
};

export const readPatients = async(
) => {
  try {
    const readPatient = await patient.findAll();
    return readPatient
  } catch (error) {
    throw new Error("Can't read patients");
  }
}
export const readPatient = async(
  userId: string
) => {
  try {
    const readPatient = await patient.findOne({where: {userId}});
    return readPatient

  } catch (error) {
    throw new Error("Can't read patient");
  }
}
