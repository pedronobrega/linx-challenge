import { Sequelize } from 'sequelize';
import dbConfig from '../config/postgres.js';

//@ts-ignore
const connection = new Sequelize(dbConfig);

export default connection;
