import { AnyMxRecord } from "dns";
import { where } from "sequelize/types";
import { appointment } from "../models/appointment";

export const createAppointments = async (appointmentDate: string, appointmentDetails: string,appointmentTime:string, is_deleted:boolean, patientId:number, doctorId:number  ) => {
  try {
    const createAppointment = await appointment.create({
      appointmentDate, appointmentDetails,appointmentTime ,is_deleted, patientId, doctorId
    });
    return createAppointment;
  } catch (error) {
    throw new Error("Something Wrong");
  }
};

export const readAppointments = async(
  limit?: number,
  offset?: number
) => {
  try {
    const readAppointment = await appointment.findAll({limit: limit, offset:offset});
    return readAppointment
  } catch (error) {
    throw new Error("Something Wrong");
  }
}
export const readAppointmentsPatient = async(
  patientId: number,
) => {
  try {
    const validation = await appointment.findByPk(patientId)
    if (patientId === validation?.patientId) {
    const readOneAppointmentP = await appointment.findOne({where: {patientId:patientId}});
    return readOneAppointmentP 
    }
    else{
      return "Invalid id"
    }
  } catch (error) {
    throw new Error("Something Wrong");
  }
}

export const listAppointmentsPatient = async(
  patientId: number,
  limit?: number,
  offset?: number
) => {
  try {
    const validation = await appointment.findByPk(patientId)
    if (patientId === validation?.patientId) {
      const readAllAppointmentsP = await appointment.findAll({where: {patientId}, limit, offset});
      return readAllAppointmentsP
    }
    else{
      return "Invalid id"
    }
  
  } catch (error) {
    throw new Error("Couldn't find patient appointments");
  }
}

export const readAppointmentsDoctor = async(
  doctorId: number
) => {
  try {
    const validation = await appointment.findByPk(doctorId)
    if (doctorId === validation?.doctorId) {
    const readOneAppointmentD = await appointment.findOne({where: {doctorId}});
    return readOneAppointmentD
    }else{
      return "Invalid id"
    }
  } catch (error) {
    throw new Error("Couldn't read doctor appointment");
  }
}

export const listAppointmentsDoctor = async(
  id: number,
  queryParams: any,
  order: any,
  orderBy: any
  
) => {
  try {
    let where: any = {
      doctorId: id
    }
    if (queryParams.patientId) {
      where.patientId = queryParams.patientId
    }
    if(queryParams.appointmentDate){
      where.appointmentDate = queryParams.appointmentDate
    }
    if(queryParams.appointmentTime){
      where.appointmentTime = queryParams.appointmentTime
    }
     if(queryParams.is_deleted){
      where.is_deleted = queryParams.is_deleted
    }
    const listAppointments = await appointment.findAll({order: [[orderBy, order ]],where});
    return listAppointments
  } catch (error) {
    throw new Error("Couldn't find doctor appointments");
  }
}

export const listAllAppointments = async(
  queryParams: any,
  orderBy:any,
  order: any,
  limit: number,
  offset: number
) => {
  try {
    let where: any = {}
    if (queryParams.patientId) {
      where.patientId = queryParams.patientId
    }
    if (queryParams.doctorId) {
      where.patientId = queryParams.patientId
    }
    if(queryParams.appointmentDate){
      where.appointmentDate = queryParams.appointmentDate
    }
    if(queryParams.appointmentTime){
      where.appointmentTime = queryParams.appointmentTime
    }
     if(queryParams.is_deleted){
      where.is_deleted = queryParams.is_deleted
    }
    const listAppointments = await appointment.findAll({order: [[orderBy, order ]],where, limit, offset});
    return listAppointments
  } catch (error) {
    throw new Error("Couldn't find appointments");
  }
}

export const findAppointment = async(
  id: number
)=>{
  try {
    const appointments = await appointment.findByPk(id)
    if (id === appointments?.id){
      return appointments
    }else{
      return "Invalid id"
    }
  } catch (error) {
    throw new Error("Couldn't find appointment");
  }
}


export const deleteAppointments = async(
  id:number
)=>{
  try {
    const appointments = await appointment.findByPk(id)
    if(appointments?.is_deleted.toString() === "false")
    {
      const deleteAppointment = await appointment.update({is_deleted: true},{where: {id}})
      return deleteAppointment
    }else{
      const deleteAppointment = await appointment.update({is_deleted: false},{where: {id}})
      return deleteAppointment
    }
  } catch (error) {
    throw new Error("Couldn't delete appointment");
  }
}


export const updateAppointment = async( id: number, payload: any) =>{
  try {
    await appointment.update(payload, {where:{id}})
  } catch (error) {
    throw new Error("Couldn't update appointment");
  }

}
