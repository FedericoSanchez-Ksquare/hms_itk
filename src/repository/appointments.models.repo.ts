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
  limit?: number,
  offset?: number
) => {
  try {
    // Remember that since ES6, you can only use { limit, offset }
    const readAppointment = await appointment.findAll({limit: limit, offset:offset});
    return readAppointment
  } catch (error) {
    console.log(error)
  }
}
export const readAppointmentsPatient = async(
  patientId: number,
) => {
  try {
    // is it possible to not receive at this point a patientId? if no, why do you have this conditional.
    // If it's possible, then why don't you have the else statement or the code to handle that scenario
    if(patientId){
      // Remember that since ES6, you can only use { patientId }
    const readOneAppointmentP = await appointment.findOne({where: {patientId:patientId}});
    return readOneAppointmentP 
    }
  } catch (error) {
    console.log(error)
  }
}

export const listAppointmentsPatient = async(
  patientId: number,
  limit?: number,
  offset?: number
) => {
  try {
    // is it possible to not receive at this point a patientId? if no, why do you have this conditional.
    // If it's possible, then why don't you have the else statement or the code to handle that scenario
    if (patientId) {
      // Remember that since ES6, you can only use {patientId}, limit, offset}
      const readAllAppointmentsP = await appointment.findAll({where: {patientId:patientId}, limit: limit, offset:offset});
      return readAllAppointmentsP
    }
  
  } catch (error) {
    console.log(error)
  }
}

export const readAppointmentsDoctor = async(
  doctorId: number
) => {
  try {
    // Remember that since ES6, you can only use {doctorId}
    const readOneAppointmentD = await appointment.findOne({where: {doctorId:doctorId}});
    return readOneAppointmentD
  } catch (error) {
    console.log(error)
  }
}
// Please refactor this function to accept none, one, or more filters per request
export const listAppointmentsDoctor = async(
  id: number,
  filter?: any,
  value?: any,
  order?: any,
  
) => {
  try {
    let listAllAppointmentsD
    switch (filter) {
      case "patientId":
        if (value === "patientId" || value === "doctorId" ) {
          listAllAppointmentsD = await appointment.findAll({order: [[value, order ]],where: {doctorId:id}});
        }else{
          listAllAppointmentsD = await appointment.findAll({order: [['id', order ]],where: {doctorId:id, patientId:value}});
        }
        break;
      case "doctorId":
        if (value === "doctorId" || value === "patientId" ) {
         listAllAppointmentsD = await appointment.findAll({order: [[value, order]],where: {doctorId:id}}); 
        }
        else{
          listAllAppointmentsD = await appointment.findAll({order: [['id', order]],where: {doctorId:id}}); 
        }
        break;
      case "appointmentDate":
        listAllAppointmentsD = await appointment.findAll({order: [['id', order]],where: {doctorId:id,appointmentDate:value}});  
        break;
      case "appointmentTime":
        listAllAppointmentsD = await appointment.findAll({order: [['id', order ]],where: {doctorId:id,appointmentTime:value}});   
        break;
      case "is_deleted":
        listAllAppointmentsD = await appointment.findAll({order: [['id', order ]],where: {doctorId:id, is_deleted:value}});
        
        break;
      default:
        listAllAppointmentsD = await appointment.findAll({where: {doctorId:id}});
        break;
    }
    return listAllAppointmentsD
  } catch (error) {
    console.log(error)
  }
}
// Please refactor this function to accept none, one, or more filters per request
export const listAllAppointments = async(
  id: number,
  filter?: any,
  value?: any,
  order?: any,
  limit?: number,
  offset?: number
) => {
  try {
    let listAllAppointmentsD
    switch (filter) {
      case "patientId":
        if(id>0)
        {
          listAllAppointmentsD = await appointment.findAll({order: [['id', order ]],where: {patientId:id},limit: limit, offset:offset});
        }
        else{
          listAllAppointmentsD = await appointment.findAll({order: [['patientId', order ]],limit: limit, offset:offset});
        }
        break;
      case "doctorId":
        if(id>0){
          listAllAppointmentsD = await appointment.findAll({order: [['id', order]],where: {doctorId:id},limit: limit, offset:offset}); 
        }else{
          listAllAppointmentsD = await appointment.findAll({order: [['doctorId', order]],limit: limit, offset:offset}); 
        }
        break;
      case "is_deleted":
        if(value ==="false")
        {
          listAllAppointmentsD = await appointment.findAll({order: [[filter, order ]],where: {is_deleted:"false"},limit: limit, offset:offset});
        }
        if(value=== "true")
        {
          listAllAppointmentsD = await appointment.findAll({order: [[filter, order ]],where: {is_deleted:"true"},limit: limit, offset:offset});
        }
        break;
      default:
        listAllAppointmentsD = await appointment.findAll({order: [[filter, order ]],limit: limit, offset:offset});
        break;
    }
    return listAllAppointmentsD
  } catch (error) {
    console.log(error)
  }
}


export const deleteAppointments = async(
  id:number, is_deleted: boolean
)=>{
  try {
    // Remember that since ES6, you can only use {is_deleted}
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
    // Remember that since ES6, you can only use {appointmentTime, appointmentDate}
    const updateTime = await appointment.update({appointmentTime: appointmentTime, appointmentDate: appointmentDate }, {where:{id}})
    console.log("time updated"+id);
    return updateTime
  } catch (error) {
    console.log(error);
    
  }
}
