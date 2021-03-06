import {Model,InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize} from 'sequelize'

export class user extends Model <InferAttributes<user>,
InferCreationAttributes<user>
>{
    declare id: CreationOptional<number>;
    
    declare password: string;
    declare email: string;
    declare is_active: boolean;
    roleId?: number;
}


export const initUserModel = (sequelize: Sequelize) =>{
    user.init({
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        password:{
            type: new DataTypes.STRING(100),
            allowNull: false
        },
        email:{
            type: new DataTypes.STRING(100),
            allowNull: false
        },
        is_active:{
            type: new DataTypes.STRING(100),
            allowNull: false
        },
    },{
        tableName: 'users',
        sequelize: sequelize
        
    })
}
