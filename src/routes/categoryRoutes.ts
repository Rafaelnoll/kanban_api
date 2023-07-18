import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();

// GET
router.get('/categories/:id', authenticateToken, CategoryController.show);
router.get('/categories', authenticateToken, CategoryController.index);

// POST
router.post('/categories', CategoryController.store);

// PUT
router.put('/categories/:id', CategoryController.update);

// Delete
router.delete('/categories/:id', CategoryController.delete);

export default router;
