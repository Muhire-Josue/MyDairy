import express from 'express';
import userController from '../controllers/userController';
import entryController from '../controllers/entryController';
import auth from '../middlewares/auth';
import permission from '../middlewares/permission';
import duplication from '../middlewares/entryDuplication';
import entryValidation from '../middlewares/validate';
import userValidation from '../middlewares/userValidation';

const router = express.Router();

router.get('/api/v2/', userController.entryMessage);
router.post('/api/v2/auth/signup', userValidation, userController.createAccount);
router.post('/api/v2/auth/signin', userController.Login);
router.post('/api/v2/entries', auth, entryValidation, duplication, entryController.addEntry);
router.patch('/api/v2/entries/:entryId', auth, permission, entryValidation, entryController.modifyEntry);
router.delete('/api/v2/entries/:entryId', auth, permission, entryController.deleteEntry);
router.get('/api/v2/entries/:entryId', auth, permission, entryController.getEntry);
router.get('/api/v2/entries', auth, entryController.allEntries);


export default router;
