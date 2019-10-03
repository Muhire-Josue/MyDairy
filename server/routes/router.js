import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/api/v1/auth/', userController.entryMessage);
router.post('/api/v1/auth/signup', userController.createAccount);
router.post('/api/v1/auth/signin', userController.Login);

export default router;
