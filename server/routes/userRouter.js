import express from 'express';
import userController from '../controllers/userController';
import userValidation from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v2/auth/signup', userValidation, userController.createAccount);
router.post('/api/v2/auth/signin', userController.Login);


export default router;
