import User from "../models/user.model.js"; 
import bcryptjs from  'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

//It's for signup page 
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
   
};
//------------************--------------------

// It's for sign in 

export const signin =async (req,res,next) => {
      const { email, password } =req.body;
      // check all fields
      if(!email || !password || email ==='' || password===''){
         next(errorHandler(400,'All fields are required'));
      }

      try {
         //it will find the valid email and store it 
         const validUser =await User.findOne({email});

         if(!validUser){
            return next(errorHandler(404,'User not found'));
         }
         //it will help us to compare the password and then hash the password
         const validPassword =bcryptjs.compareSync(password,validUser.password);

         if(!validPassword){
           return next(errorHandler(400,'Invalid password'));
         }

         const token =jwt.sign({ id:validUser._id}, process.env.JWT_SECRET);

         //we dont want to see hash password also in database for that

         const {password:pass, ...rest} =validUser._doc;

         res.status(200).cookie('access_token', token,{
            httpOnly:true}).json(rest);//return to validuser using rest
      } catch (error) {
         next(error);
      }

}