import express from 'express';
import { sendSuccessResponse } from '../helpers/response-helper';
import authRouter from './auth';

const router = express.Router();

router.get('/', (req, res) => {
  sendSuccessResponse(res, 'Tweet Auth Service');
});

router.use('/auth', authRouter);

export default router;
