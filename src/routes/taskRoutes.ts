import express from 'express';
import TaskController from '../controllers/TaskController';
import authenticateToken from '../middlewares/authenticateToken';

const router = express.Router();

// GET
router.get('/tasks/category/:category_id', TaskController.listAllByCategory);
router.get('/tasks/:id', authenticateToken, TaskController.show);
router.get('/tasks', authenticateToken, TaskController.index);

// POST
router.post('/tasks', authenticateToken, TaskController.store);

// PUT
router.put('/tasks/:id', authenticateToken, TaskController.update);

// Delete
router.delete('/tasks/:id', authenticateToken, TaskController.delete);

export default router;
