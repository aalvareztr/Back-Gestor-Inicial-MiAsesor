import { connect } from "../db/db.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";
//Middleware para verificar token
export const verifyToken = (req,res,next) =>{
    try{
      const token = req.cookies.tkn
      const validPayload = jwt.verify(token,process.env.JWT_SECRET_KEY)
      next()
    }catch(err){
      return res.status(401).json({message:'invalid token'})
    }
}

//Funcion check auth
export const checkAuth = async (req,res) =>{
  return res.status(200).json({message:"auth token!"})
}




//Signin
export const login = async (req,res) =>{
    const { username,password } = req.body;
    try{    
        const result = await connect.execute('SELECT * FROM usuarios WHERE username = ?',[username]);
        if(result[0].length !== 1){
          return res.status(401).json({message:"el usuario no es valido"});
        }
        const user = result[0][0]

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid === false){
          return res.status(401).json({message:"contraseña incorrecta"});
        }
        const data = {username:user.username,role:user.role,area:user.area}
        const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
        return res.status(200).json({token});
    }catch(err){
        return res.json({ok:false,message:"error del servidor"}).status(400)
    }
}


export const getContratos = async(req,res) =>{
    try{
        const [contratos] = await connect.execute('SELECT contratos.fecha,clientes.razon_social,clientes.tipo,contratos.id AS idContrato,clientes.rut AS idCliente FROM contratos INNER JOIN clientes ON contratos.id_cliente = clientes.rut')
        return res.status(200).json({contratos})
    }catch(err){
        return res.status(400).json({message:err})
    }
}


export const getContratoDetail = async (req,res) =>{
    const idContrato = req.query.idContrato
    //const idCliente = req.query.idCliente
    try{
      const [cliente] = await connect.execute('SELECT clientes.razon_social AS razon_social, clientes.tipo AS tipo_de_cliente, clientes.rut, clientes.mail, clientes.telefono FROM contratos INNER JOIN clientes ON clientes.rut = contratos.id_cliente WHERE contratos.id = ?',[idContrato]);

      const [planes] = await connect.execute('SELECT planes.nombre, planes.precio, planes.descripcion, planes.mes_de_gracia FROM planes_por_contrato INNER JOIN planes ON planes_por_contrato.id_plan = planes.id WHERE planes_por_contrato.id_contrato = ?',[idContrato])
      return res.status(200).json({cliente:cliente[0],planes})
      /*
        const [contrato] = await connect.execute(`
            SELECT clientes.razon_social AS razon_social, clientes.tipo AS tipo_de_cliente, clientes.rut, clientes.mail, clientes.telefono, representantes_legales.nombre AS representante_legal 
            FROM clientes INNER JOIN representantes_legales ON clientes.rut = representantes_legales.id_cliente 
            WHERE clientes.rut = "${idCliente}" AND representantes_legales.priority = 1;
        `)
        const [clienteDetail] = await connect.execute('SELECT clientes.razon_social,clientes.tipo AS tipo_de_cliente, clientes.rut, clientes.mail, clientes.telefono,')

        const [planes] = await connect.execute('SELECT planes.nombre, planes.descripcion, planes.precio, planes.mes_de_gracia FROM planes_por_contrato INNER JOIN planes ON planes_por_contrato.id_plan = planes.id WHERE planes_por_contrato.id_contrato = ?',[idContrato])
        return res.status(200).json({contrato,planes})
      */
    }catch(err){
      return res.status(400).json({message:err})
    }
    
}