import express from 'express';
import userController from '../controllers/userController';
import entryController from '../controllers/entryController';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/api/v1/auth/', userController.entryMessage);
router.get('/api/v1/entries', auth, entryController.allEntries);
router.get('/api/v1/entries/:entryId', auth, entryController.getEntry);
router.post('/api/v1/auth/signup', userController.createAccount);
router.post('/api/v1/auth/signin', userController.Login);
router.post('/api/v1/entries', auth, entryController.addEntry);
router.patch('/api/v1/entries/:entryId', auth, entryController.modifyEntry);
router.delete('/api/v1/entries/:entryId', auth, entryController.deleteEntry);


export default router;
