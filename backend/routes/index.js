import express from 'express';
import fishRoutes from './fish.js';
import authRoutes from './auth.js';
import usersRoutes from './users.js'

const router = express.Router();

router.use('/auth', authRoutes)
router.use('/fish', fishRoutes);
router.use('/users', usersRoutes)

export default router;
