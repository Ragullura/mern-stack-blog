import  jwt  from "jsonwebtoken";
import {errorHandler} from './error.js';

export const  verifyToken = (req, res ,next) =>{
    const token =req.cookie.access_token; //install  cookie-parser middleware first to access req. in
    if(!token){
        return next(errorHandler(401,'Unauthorized'));
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user) =>{
        if(err){
            return next(errorHandler(401,'Unauthorized'));
        }
        req.user =user; 
        next();
    })


}