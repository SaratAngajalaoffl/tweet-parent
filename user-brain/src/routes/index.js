import express from 'express';
import { validateUser } from '../helpers/jwt-helper';
import userRouter from './user';

const router = express.Router();

router.use('/users', validateUser, userRouter);

export default router;
