import { appointment } from "../models/appointment";

export const createAppointments = async (appointmentDate: string, appointmentDetails: string,appointmentTime:string, is_deleted:boolean, patientId:number, doctorId:number  ) => {
  try {
    const createAppointment = await appointment.create({
      appointmentDate, appointmentDetails,appointmentTime ,is_deleted, patientId, doctorId
    });
    console.log("Appointment created with id= "+createAppointment.id);
    return createAppointment.id;
  } catch (error) {
    console.error(error);
  }
};

export const readAppointments = async(
  id: number,
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
export const readAppointmentsPatient = async(
  userId: string,
  patientId: number,
) => {
  try {
    if(patientId){
    const readOneAppointmentP = await appointment.findOne({where: {patientId:patientId}});
    return readOneAppointmentP 
    }
  } catch (error) {
    console.log(error)
  }
}

export const listAppointmentsPatient = async(
  patientId: number,
) => {
  try {
    if (patientId) {
      const readAllAppointmentsP = await appointment.findAll({where: {patientId:patientId}});
      return readAllAppointmentsP
    }
  
  } catch (error) {
    console.log(error)
  }
}

//mas brujeria

export const readAppointmentsDoctor = async(
  doctorId: number
) => {
  try {
    const readOneAppointmentD = await appointment.findOne({where: {doctorId:doctorId}});
    return readOneAppointmentD
  } catch (error) {
    console.log(error)
  }
}

export const listAppointmentsDoctor = async(
  doctorId: number
) => {
  try {
    const listAllAppointmentsD = await appointment.findAll({where: {doctorId:doctorId}});
    return listAllAppointmentsD
  } catch (error) {
    console.log(error)
  }
}


export const deleteAppointments = async(
  id:number, is_deleted: boolean
)=>{
  try {
    const deleteAppointment = await appointment.update({is_deleted: is_deleted},{where: {id}})
    return deleteAppointment
  } catch (error) {
    console.log(error);
    
  }
}

export const updatesTime = async(
  id: number, appointmentTime: string, appointmentDate: string
) =>{
  try {
    const updateTime = await appointment.update({appointmentTime: appointmentTime, appointmentDate: appointmentDate }, {where:{id}})
    console.log("time updated"+id);
    return updateTime
  } catch (error) {
    console.log(error);
    
  }
}
