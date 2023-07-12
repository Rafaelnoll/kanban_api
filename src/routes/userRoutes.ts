import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = Router();

// GET
router.get('/users', UserController.index);

// POST
router.post('/users', UserController.store);
router.post('/users/login', UserController.login);

// PUT
router.put('/users/:id', UserController.update);
router.put('/users/:id/change-password', UserController.updatePassword);

// Delete
router.delete('/users/:id', UserController.delete);

export default router;
