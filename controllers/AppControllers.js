import { connect } from "../db/db.js"
import jwt from 'jsonwebtoken';

//Middleware para verificar token
export const verifyToken = (req,res,next) =>{
    try{
      const token = req.cookies.tkn
      const validPayload = jwt.verify(token,process.env.JWT_SECRET_KEY)
      next()
    }catch(err){
      return res.status(401).json({ok:false,message:'invalid token'})
    }
}




export const getContratos = async(req,res) =>{
    try{
        const [contratos] = await connect.execute('select contratos.fecha,clientes.razon_social,clientes.tipo,contratos.id from contratos INNER JOIN clientes ON contratos.id_cliente = clientes.rut')
        return res.status(200).json({contratos})
    }catch(err){
        return res.status(400).json({message:err})
    }
}


export const getContratoDetail = async (req,res) =>{
    const idContrato = req.params.id
    try{
        const [contrato] = await connect.execute(`
            SELECT clientes.razon_social AS razon_social, clientes.tipo AS tipo_de_cliente, clientes.rut, clientes.mail, clientes.telefono, representantes_legales.nombre AS representante_legal 
            FROM clientes INNER JOIN representantes_legales ON clientes.rut = representantes_legales.id_cliente 
            WHERE clientes.rut = "${idContrato}" AND representantes_legales.order_num = 1;
        `)
        const [planes] = await connect.execute(`
            SELECT 
        `)
        return res.status(200).json({contrato})

    }catch(err){

    }
}