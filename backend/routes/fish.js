import express from 'express';
import { createTask, getAllTasks } from '../controllers/fish.js';

const router = express.Router();

router.post('/', createTask);
router.get('/all',getAllTasks)


export default router;