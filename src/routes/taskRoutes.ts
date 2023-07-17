import express from 'express';
import TaskController from '../controllers/TaskController';
import authenticateToken from '../middlewares/authenticateToken';

const router = express.Router();

// GET
router.get('/tasks/category/:category_id', TaskController.listAllByCategory);
router.get('/tasks/:id', TaskController.show);
router.get('/tasks', TaskController.index);

// POST
router.post('/tasks', authenticateToken, TaskController.store);

// PUT
router.put('/tasks/:id', TaskController.update);

// Delete
router.delete('/tasks/:id', TaskController.delete);

export default router;
