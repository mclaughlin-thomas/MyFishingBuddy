import express from 'express';
import { createTask, getAllFish, getCurrentUsersFish, updateFish } from '../controllers/fish.js';

const router = express.Router();

router.post('/', createTask);
router.get('/all',getAllFish);
router.get('/myFish', getCurrentUsersFish);
router.put('/:fishId', updateFish);


export default router;