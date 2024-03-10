import express from 'express';
import { test } from '../controllers/user.controller.js';

const router =express.Router();

router.get('/test', test);

export default router; //it is a default so we use different name [userRoutes] to import in index.js