import { connect } from "../db/db.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";

//Middleware para verificar token
export const verifyToken = (req,res,next) =>{
    try{
      const token = req.cookies.tkn
      console.log('token')
      const validPayload = jwt.verify(token,
        //process.env.JWT_SECRET_KEY
        'secret_key'
        )
      console.log(validPayload)
      next()
    }catch(err){
      return res.status(401).json({ok:false,message:'invalid token'})
    }
}

//Funcion check auth
export const checkAuth = async (req,res) =>{
    return res.status(200).json({ok:true,message:"auth token!"})
}


//Signin
export const login = async (req,res) =>{
    const { username,password } = req.body;
    try{    
        const result = await connect.execute('SELECT * FROM usuarios WHERE username = ?',[username]);
        //console.log(result)
        if(result[0].length !== 1){
          return res.status(401).json({message:"el email no es valido"});
        }
        const user = result[0][0]
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid === false){
          return res.status(401).json({message:"contraseña incorrecta"});
        }
        const token = jwt.sign({username}, //process.env.JWT_SECRET_KEY
        'secret_key'
        );
        return res.status(200).json({token});
    }catch(err){
        return res.json({ok:false,message:"error del servidor"}).status(400)
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