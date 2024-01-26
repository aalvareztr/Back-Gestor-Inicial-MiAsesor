import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";


export const verifyToken = (req,res,next) =>{
    try{
      const token = req.cookies.tkn
      const validPayload = jwt.verify(token,process.env.JWT_SECRET_KEY)
      next()
    }catch(err){
      return res.status(401).json({message:'invalid token'})
    }
}

export const checkAuth = async (req,res) =>{
  return res.status(200).json({message:"auth token!"})
}
