import {Model,InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize} from 'sequelize'

export class patient extends Model <InferAttributes<patient>,InferCreationAttributes<patient>>{
    declare id: CreationOptional<number>;
    declare firstName: string;
    declare lastName: string;
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
        firstName:{
            type: new DataTypes.STRING(100),
            allowNull: false
        },
        lastName:{
            type: new DataTypes.STRING(100),
            allowNull: false
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
            type: DataTypes.STRING(100),
            
        }
    },{
        tableName: 'patients',
        sequelize: sequelize
    })
}