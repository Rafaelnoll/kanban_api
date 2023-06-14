import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';

const router = Router();

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);

export default router;
