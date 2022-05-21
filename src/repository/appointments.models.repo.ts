import { appointment } from "../models/appointment";

export const createAppointments = async (appointmentDate: string, appointmentDetails: string, patientId:number, doctorId:number  ) => {
  try {
    const createAppointment = await appointment.create({
      appointmentDate, appointmentDetails,patientId,doctorId
    });
    console.log("Appointment created with id= "+createAppointment.id);
    return createAppointment.id;
  } catch (error) {
    console.error(error);
  }
};

export const readAppointments = async(
  id: number
) => {
  try {
    if(id){
      const readAppointment = await appointment.findByPk(id);
      return readAppointment
    }else{
      const readAppointment = await appointment.findAll();
      return readAppointment
    }
  } catch (error) {
    console.log(error)
  }
}