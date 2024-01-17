import mysql from 'mysql2/promise';
import { config } from './config.js';

export const connect = await mysql.createConnection(config)