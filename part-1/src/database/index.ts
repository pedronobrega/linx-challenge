import { Sequelize } from 'sequelize';
import dbConfig from '../config/postgres.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const connection = new Sequelize(dbConfig);

export default connection;
