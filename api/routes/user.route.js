//testing api
import express from 'express';
import { deleteUser, signout, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router =express.Router();

router.get('/test', test);
router.put('/update/:userId',verifyToken, updateUser); //put  request to update user info by id
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
export default router; //it is a default so we use different name [userRoutes] to import in index.js