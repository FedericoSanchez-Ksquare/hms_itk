import {Model,InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize} from 'sequelize'
import { sequelize }  from '.'

export class roles extends Model <InferAttributes<roles>,
InferCreationAttributes<roles>
>{
    declare id: CreationOptional<number>;
    declare role: string;
}


export const initRoleModel = (sequelize: Sequelize) =>{
    roles.init({
        role:{
            type: new DataTypes.STRING(100),
            allowNull: false
        },
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },

    },{
        tableName: 'role',
        sequelize: sequelize
    })
    roles.sync();
}