import {Model,InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize} from 'sequelize'
import { sequelize }  from '.'
import { user } from './user';

export class doctor extends Model <InferAttributes<doctor>,InferCreationAttributes<doctor>>{
    declare id: CreationOptional<number>;
    declare medicalSpeciality: string;
    userId?: number;
}


export const initDoctorModel = (sequelize: Sequelize) =>{
    doctor.init({
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        medicalSpeciality:{
            type: new DataTypes.STRING(100),
            allowNull: false
        },

    },{
        tableName: 'doctor',
        sequelize: sequelize
    })
    doctor.belongsTo(user)
}