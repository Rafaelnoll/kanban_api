import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';

const router = Router();

// GET
router.get('/categories/:id', CategoryController.show);
router.get('/categories', CategoryController.index);

// POST
router.post('/categories', CategoryController.store);

// PUT
router.put('/categories/:id', CategoryController.update);

// Delete
router.delete('/categories/:id', CategoryController.delete);

export default router;
