import { Router } from 'express';

import UserController from '../controllers/UserController';
import authenticateToken from '../middlewares/authenticateToken';
import verifyUser from '../middlewares/verifyUser';
import upload from '../utils/upload';

const router = Router();

// GET
router.get('/users', UserController.index);
router.get('/users/:id', authenticateToken, verifyUser, UserController.show);

// POST
router.post('/users', UserController.store);
router.post('/users/login', UserController.login);
router.post('/users/forgot-password', UserController.sendEmailToResetPassword);

// PUT

router.put('/users/reset-password', UserController.resetUserPassword);
router.put('/users/:id', authenticateToken, verifyUser, UserController.update);
router.put(
  '/users/:id/change-password',
  authenticateToken,
  verifyUser,
  UserController.updatePassword,
);
router.put(
  '/users/:id/change-picture',
  authenticateToken,
  verifyUser,
  upload.single('file'),
  UserController.changeProfilePicture,
);

// Delete
router.delete(
  '/users/:id',
  authenticateToken,
  verifyUser,
  UserController.delete,
);

export default router;
