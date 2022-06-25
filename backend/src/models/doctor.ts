import {Model,InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize} from 'sequelize'

export class doctor extends Model <InferAttributes<doctor>,InferCreationAttributes<doctor>>{
    declare id: CreationOptional<number>;
    declare firstName: string;
    declare lastName: string;
    declare medicalSpeciality: string;
    declare userId: string;
}


export const initDoctorModel = (sequelize: Sequelize) =>{
    doctor.init({
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
        medicalSpeciality:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        userId:{
            type: DataTypes.STRING(100)
        }

    },{
        tableName: 'doctor',
        sequelize: sequelize
    })
}