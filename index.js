import  express  from "express";
import AppRoutes from './router/AppRouter.js';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";


const app = express()
const corsOptions = {
    origin: process.env.APP_URL,
    credentials: true,
};

console.log("Hola agos como va");
console.log("Hola agos como va, desde la nueva rama");
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
app.use(AppRoutes);
const PORT = process.env.PORT || 3000
app.listen(process.env.PORT || 3000);


