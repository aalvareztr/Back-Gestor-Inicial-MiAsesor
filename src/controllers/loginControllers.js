import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function loginFnct (req,res) {
    const { username,password } = req.body;
    try {
        const result = await User.findAll({
            where: {
              username: username,
            },
        });
        console.log(result.length);

        if(result.length !== 1){
          return res.status(401).json({message:'el usuario no existe'});
        }

        const isPasswordValid = await bcrypt.compare(password,result[0].dataValues.password)
        if (isPasswordValid === false){
          return res.status(401).json({message:'la contrasena es invalida'});
        }
        
        const data = {username,role:result[0].dataValues.role,area:result[0].dataValues.area}
        const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
        return res.status(200).json({token})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:error})
    }
}