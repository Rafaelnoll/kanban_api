import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';

const router = Router();

router.get('/categories/:id', CategoryController.show);
router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

export default router;
