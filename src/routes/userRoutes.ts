import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = Router();

router.get('/users', UserController.index);
router.post('/users', UserController.store);
router.delete('/users/:id', UserController.delete);
router.put('/users/:id', UserController.update);
router.put('/users/:id/change-password', UserController.updatePassword);

export default router;
