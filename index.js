import  express  from "express";
import AppRoutes from './router/AppRouter.js';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";


const app = express()
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
app.use(AppRoutes);
const PORT = process.env.PORT || 3000
app.listen(process.env.PORT || 3000);


console.log(`server on port ${PORT}`)