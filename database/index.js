import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;



export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: 'mssql',
  host: dbHost,
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
      enableArithAbort: true,
      useUTC: false,
      connectTimeout: 60000,
      requestTimeout: 60000
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000
  },
  logging: console.log,
  define: {
    freezeTableName: true,
    timestamps: true
  }
});

export const conectarDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw error;
  }
};




