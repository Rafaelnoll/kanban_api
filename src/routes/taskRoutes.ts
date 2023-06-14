import express from 'express';
import TaskController from '../controllers/TaskController';

const router = express.Router();

router.get('/tasks', TaskController.index);
router.post('/tasks', TaskController.store);

export default router;
