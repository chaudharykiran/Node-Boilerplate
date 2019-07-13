import { Router } from 'express';

import * as authController from './authController';
import { userValidator } from './authValidators';

const router = Router();

router.post('/register', userValidator, authController.createUser);
router.post('/checkmail', authController.checkMail);
router.post('/login', userValidator, authController.loginUser);

export default router;
