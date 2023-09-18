import { Router } from 'express';

import UserController from '../controllers/UserController';
import authenticateToken from '../middlewares/authenticateToken';
import verifyUser from '../middlewares/verifyUser';
import upload from '../utils/upload';
import requestLimiter from '../middlewares/requestLimiter';

const router = Router();

// GET
router.get('/users/:id', authenticateToken, verifyUser, UserController.show);

// POST
router.post('/users', requestLimiter(100), UserController.store);
router.post('/users/login', UserController.login);
router.post(
  '/users/forgot-password',
  requestLimiter(5),
  UserController.sendEmailToResetPassword,
);

// PUT

router.put(
  '/users/reset-password',
  requestLimiter(10),
  UserController.resetUserPassword,
);
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
