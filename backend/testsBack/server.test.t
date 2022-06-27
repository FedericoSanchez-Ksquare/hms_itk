
describe("my connection to sql"), () => {
    it("it should initialize the psql db"), ()=>{
        const models = [
          initUserModel,
          initPatientModel,
          initDoctorModel,
          initAppointmentsModel,
        ];
    };
    export const  startSequelize = (
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
 
  sequelize.sync();

}