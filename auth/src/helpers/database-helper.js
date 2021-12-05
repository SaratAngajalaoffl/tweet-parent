import { Sequelize } from 'sequelize';
import { registerModels } from '../models';

export const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: 'postgres',
});

export const testPsqlConnection = async () => {
  try {
    await sequelize.authenticate();
    await registerModels();
    console.log('Connection to database established successfully.');
  } catch (error) {
    console.log(error.message);
    console.log('Trying to establish connection again in 2 secs');
    setTimeout(() => {
      testPsqlConnection();
    }, 2000);
  }
};
