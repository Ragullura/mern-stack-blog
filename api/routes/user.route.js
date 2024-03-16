//testing api
import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router =express.Router();

router.get('/test', test);
router.put('/updateUser/:id',verifyToken, updateUser); //put  request to update user info by id

export default router; //it is a default so we use different name [userRoutes] to import in index.js