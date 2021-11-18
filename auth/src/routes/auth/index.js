import express from 'express';
import { sendSuccessResponse } from '../helpers/response-helper';
import { loginUser, registerUser } from './auth-handlers';

const router = express.Router();

router.get('/login', loginUser);
router.get('/register', registerUser);

export default router;
