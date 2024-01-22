import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
//rutas
import loginRoute from './src/routes/login.js'
//ruta para los contratos
import testRoutes from './src/routes/testerRoutes.js'

const app = express();

const corsOptions = {
  origin: process.env.APP_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/login',loginRoute);
app.use('/legal',testRoutes) 


const PORT = 3000 || process.env.PORT;
app.listen(PORT)
console.log('server on port ' + PORT);