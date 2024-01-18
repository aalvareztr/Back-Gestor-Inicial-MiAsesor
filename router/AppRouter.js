import { Router } from "express";
import { connect } from "../db/db.js";
import bcrypt from 'bcrypt';
import { checkAuth, getContratoDetail, getContratos, login, verifyToken } from "../controllers/AppControllers.js";


const route  = Router()

/*Login*/
route.post('/api/login',login);

/*Check Auth*/
route.get('/api/check-auth',verifyToken,checkAuth);

/*Obtener todos los contratos*/
route.get('/api/contratos',verifyToken,getContratos)

/*Obtener detalles de un contrato por id*/
//ej /api/contrato?idContrato=1234&idCliente=12345

route.get('/api/contrato',verifyToken,getContratoDetail)



export default route