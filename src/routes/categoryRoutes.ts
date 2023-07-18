import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();

// GET
router.get('/categories/:id', authenticateToken, CategoryController.show);
router.get('/categories', authenticateToken, CategoryController.index);

// POST
router.post('/categories', authenticateToken, CategoryController.store);

// PUT
router.put('/categories/:id', authenticateToken, CategoryController.update);

// Delete
router.delete('/categories/:id', authenticateToken, CategoryController.delete);

export default router;
