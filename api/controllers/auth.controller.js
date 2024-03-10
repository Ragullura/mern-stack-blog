import User from "../models/user.model.js"; 
import bcryptjs from  'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup =async (req,res,next) =>{
   const {username,email,password} = req.body; 

    // check  if user already exists in the database
   if(!username || !email || !password || username==='' || email ==='' || password===''){
    /* return res.status(400).json({msg:'Please fill out all fields.'}); */
    //added from errorhandler
    next(errorHandler(400,"Please fill out all fields"));
   }

   // hashing our password  before saving it to the database

   const hashedPassword =bcryptjs.hashSync(password,10);

   // add data  to the database
   const newUser =new User({
    username,
    email,
    password:hashedPassword,
   });

   //we use try catch  here because we are dealing with asynchronous code
   try {
    //now we save  that data into our database
   await newUser.save();
   //return a success message for our knowledge
   res.json("New account has been created successfully.");
   } catch (error) {
    //added middleware here to check the error
    next(error);
    
   }
   
   


}