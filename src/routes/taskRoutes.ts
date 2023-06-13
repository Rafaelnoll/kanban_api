import express from 'express';
import TaskController from '../controllers/TaskController';

const router = express.Router();

router.get('/', TaskController.index);

export default router;
