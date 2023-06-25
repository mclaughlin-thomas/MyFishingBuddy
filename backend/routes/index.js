import express from 'express';
import fishRoutes from './fish.js';
import authRoutes from './auth.js';
import usersRoutes from './users.js'
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

router.use('/auth', authRoutes)
router.use('/fish', checkAuth,fishRoutes);
router.use('/users', checkAuth, usersRoutes)

export default router;
