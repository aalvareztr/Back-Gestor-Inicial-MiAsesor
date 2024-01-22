import { Router } from "express";
import { getContratoDetail, getContratos } from "../controllers/contratosControllers.js";
import { verifyToken } from "../controllers/authControllers.js";

const route = Router();


route.get('/contratos',verifyToken,getContratos);

route.get('/contratos/:id',getContratoDetail)

export default route;