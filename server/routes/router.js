import express from 'express';
import userController from '../controllers/userController';
import entryController from '../controllers/entryController';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/api/v2/', userController.entryMessage);
router.post('/api/v2/auth/signup', userController.createAccount);
router.post('/api/v1/auth/signin', userController.Login);
router.post('/api/v2/entries', auth, entryController.addEntry);


export default router;
