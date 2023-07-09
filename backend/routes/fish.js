import express from 'express';
import { createFish, getAllFish, getCurrentUsersFish, updateFish, deleteFish } from '../controllers/fish.js';

const router = express.Router();

router.post('/', createFish);
router.get('/all',getAllFish);
router.get('/myFish', getCurrentUsersFish);
router.put('/:fishId', updateFish);
router.delete('/:fishId', deleteFish);


export default router;