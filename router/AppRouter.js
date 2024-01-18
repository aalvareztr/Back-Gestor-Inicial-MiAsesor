import { Router } from "express";
import { connect } from "../db/db.js";
import bcrypt from 'bcrypt';
import { checkAuth, getContratos, login, verifyToken } from "../controllers/AppControllers.js";


const route  = Router()


route.post('/api/login',login);


route.get('/api/check-auth',verifyToken,checkAuth);


/*
route.get('/api/contratos',getContratos)




route.get('/api/contrato/:id',async(req,res)=>{
    try{
        console.log(req.params.id)
        res.status(200).json({ok:true})
    }catch(err){
        res.status(400).json({message:err})
    }
})

*/


export default route