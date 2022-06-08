import { Sequelize } from 'sequelize'
import { initUserModel } from './user'
import { initPatientModel } from './patient'
import { initDoctorModel } from './doctor'
import { initAppointmentsModel } from './appointment'

export let sequelize: Sequelize

const models =[initUserModel, initPatientModel,initDoctorModel, initAppointmentsModel]

// As a commented in the main file from your app (index.ts), you can wrap a promise into startSequelize
// just to be sure that everything is going to happen after sequelize gets ready
export const startSequelize = (
  db_name: string,
  db_password: string,
  db_hostname: string,
  db_username: string
) => {
  sequelize = new Sequelize(db_name, db_username, db_password, {
    dialect: "postgres",
    host: db_hostname,
    logging: false,
  });

  for (const initModel of models) {
    initModel(sequelize);
  }
  //sequelize.sync( {force: true}); // Please remove comments from your code
  sequelize.sync();


};
