import express from 'express';
import userController from '../controllers/userController';
import entryController from '../controllers/entryController';
import auth from '../middlewares/auth';
import permission from '../middlewares/permission';

const router = express.Router();

router.get('/api/v2/', userController.entryMessage);
router.get('/api/v1/entries', auth, entryController.allEntries);
router.get('/api/v1/entries/:entryId', auth, permission, entryController.getEntry);
router.patch('/api/v1/entries/:entryId', auth, permission, entryController.modifyEntry);
router.delete('/api/v1/entries/:entryId', auth, permission, entryController.deleteEntry);
router.post('/api/v2/auth/signup', userController.createAccount);
router.post('/api/v1/auth/signin', userController.Login);
router.post('/api/v1/entries', auth, entryController.addEntry);


export default router;
