import {Model,InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize} from 'sequelize'
import { sequelize }  from '.'
import { doctor } from './doctor';
import { initPatientModel, patient } from './patient';

export class appointment extends Model <InferAttributes<appointment>,InferCreationAttributes<appointment>>{
    declare id: CreationOptional<number>;
    declare appointmentDate: string;
    declare appointmentDetails: string;
    patientId?: number;
    doctorId?: number;
}

export const initAppointmentsModel = (sequelize: Sequelize) =>{
    appointment.init({
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        appointmentDate:{
            type: new DataTypes.STRING(100),
            allowNull: false
        },
        appointmentDetails:{
            type: new DataTypes.STRING(100),
            allowNull: false
        },
    },{
        tableName: 'appointments',
        sequelize: sequelize
    })
    appointment.belongsTo(patient)
    appointment.belongsTo(doctor)
}