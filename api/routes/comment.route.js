import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment } from '../controllers/comment.controller.js';

//create a  new router object using the express Router() method
const router = express.Router();

router.post('/create', verifyToken, createComment);


export default router;