import { doctor } from "../models/doctor";

export const createDoctor = async (medicalSpeciality: string, userId: string ) => {
  try {
    const newDoctor = await doctor.create({
      medicalSpeciality, userId
    });
    console.log("Doctor created with id= "+newDoctor.id);
    return newDoctor.id
  } catch (error) {
    console.error(error);
  }
};
export const readDoctors = async(
  id: number
) => {
  try {
    // In the way you have your if statement, you don't need to type else statement,
    // just put the code inside the "else" statment outside the if block.
    if(id){
      const readDoctor = await doctor.findByPk(id);
      return readDoctor
    }else{
      const readDoctor = await doctor.findAll();
      return readDoctor
    }
  } catch (error) {
    console.log(error)
  }
}

