import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';

const router = Router();

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
router.put('/categories/:id', CategoryController.update);

export default router;
