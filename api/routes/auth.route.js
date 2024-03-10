//Authentication 
//===============================================

import express from  'express';
import { signup } from '../controllers/auth.controller.js';

const router =express.Router();

router.post('/signup',signup); //post mean create something

export default  router;