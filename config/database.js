import { Sequelize } from "sequelize";

import 'dotenv/config';


export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: process.env.APP_USER,
    password: process.env.APP_PASSWORD,
    database: process.env.APP_DATABASE,
    define: {
      timestamps: false,
    },
});