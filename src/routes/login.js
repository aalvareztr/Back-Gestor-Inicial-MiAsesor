import { Router } from "express";
import { loginFnct } from "../controllers/loginControllers.js";

const route = Router();


route.post('/',loginFnct);


export default route;