import express from 'express';
import TaskController from '../controllers/TaskController';

const router = express.Router();

router.get('/tasks/category/:category_id', TaskController.listAllByCategory);
router.get('/tasks/:id', TaskController.show);
router.get('/tasks', TaskController.index);
router.post('/tasks', TaskController.store);
router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

export default router;
