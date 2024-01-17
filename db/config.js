import 'dotenv/config';

export const config = {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT, 
    user:process.env.APP_USER,
    password: process.env.APP_PASSWORD,
    database: process.env.APP_DATABASE
}