import { Router } from "express";
import { checkAuth, verifyToken } from "../controllers/authControllers.js";



const route = Router();

//verify token
//check auth
route.get('/')

route.get('/check-auth',verifyToken,checkAuth)


export default route