import { doctor } from "../models/doctor";

export const createDoctor = async (
  firstName: string, 
  lastName: string,
  medicalSpeciality: string,
  userId: string
) => {
  try {
    const newDoctor = await doctor.create({firstName, lastName,
      medicalSpeciality,
      userId,
    });
    return newDoctor;
  } catch (error) {
    throw new Error("Can't create doctor");
  }
};
export const readDoctors = async () => {
  try {
    const readDoctor = await doctor.findAll();
    return readDoctor;
  } catch (error) {
    throw new Error("Can't read Doctors");
  }
};

export const readDoctor = async (userId?: any) => {
  try {
    const readDoctor = await doctor.findOne({where: {userId}});
    return readDoctor;
  } catch (error) {
    throw new Error("Can't read Doctor");
  }
};
