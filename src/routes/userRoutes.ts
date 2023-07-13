import { Router } from 'express';

import UserController from '../controllers/UserController';
import authenticateToken from '../middlewares/authenticateToken';
import verifyUser from '../middlewares/verifyUser';

const router = Router();

// GET
router.get('/users', UserController.index);
router.get('/users/:id', authenticateToken, verifyUser, UserController.show);

// POST
router.post('/users', UserController.store);
router.post('/users/login', UserController.login);

// PUT
router.put('/users/:id', authenticateToken, verifyUser, UserController.update);
router.put(
  '/users/:id/change-password',
  authenticateToken,
  verifyUser,
  UserController.updatePassword,
);

// Delete
router.delete(
  '/users/:id',
  authenticateToken,
  verifyUser,
  UserController.delete,
);

export default router;
