import { Router } from "express";
import { getContratoDetail, getContratos, sendContrato } from "../controllers/contratosControllers.js";
import { verifyToken } from "../controllers/authControllers.js";

const route = Router();


route.get('/contratos',verifyToken,getContratos);

route.get('/contratos/:id',getContratoDetail)

route.post('/contrato',sendContrato)

export default route;