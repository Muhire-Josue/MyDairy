import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/api/v1/auth/', userController.entryMessage);

export default router;
