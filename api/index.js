import express from 'express';
import mongoose from  'mongoose';
import dotenv from  'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(
    ()=>{
        console.log('MongoDB is Connected')
    })
    .catch((err)=>{
        console.error(err);
    });
const __dirname = path.resolve();
const app=express();
app.use(express.json());
app.use(cookieParser()); //it is  used to work with cookies in req.cookies

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes );
app.use('/api/auth',authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));//we  are telling the server that if anyone tries to access and it is install using vite
//for that we use dist 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

//add  middleware to handle any request that comes into 
//the server and send back a response if it doesn't find anything
//this code add as a next  parameter in the error handling middleware function
app.use((err,req,res,next) =>{
    const statusCode =err.statusCode || 500;
    const message = err.message||"Internal Server Error";
    res.status(statusCode).json({ 
          success:false,
          statusCode,
          message,
        })
})