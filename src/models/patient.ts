import {Model,InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize} from 'sequelize'
import { sequelize }  from '.'
import { user } from './user';

export class patient extends Model <InferAttributes<patient>,InferCreationAttributes<patient>>{
    declare id: CreationOptional<number>;
    declare birth: string;
    declare weigth: number;
    declare height: number;
    declare gender: string;
    declare address: string;
    declare userId: string;
}


export const initPatientModel = (sequelize: Sequelize) =>{
    patient.init({
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        birth:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        weigth: {
            type: DataTypes.INTEGER
        },
        height: {
            type: DataTypes.INTEGER
        },
        gender:{
            type: DataTypes.STRING(100),
        },
        address:{
            type: DataTypes.STRING(100),
        },
        userId:{
            type: DataTypes.STRING(100)
        }
    },{
        tableName: 'patients',
        sequelize: sequelize
    })
    //patient.hasOne(user, { foreignKey: 'userid' })
    
}