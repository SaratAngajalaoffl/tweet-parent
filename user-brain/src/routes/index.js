import express from 'express';
import { validateUser } from '../helpers/jwt-helper';
import userRouter from './user';
import postRouter from './post';

const router = express.Router();

router.use('/users', validateUser, userRouter);
router.use('/posts', validateUser, postRouter);

export default router;
