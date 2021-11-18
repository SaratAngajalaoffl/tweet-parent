import express from 'express';
import { sendSuccessResponse } from '../helpers/response-helper';

const router = express.Router();

router.get('/', (req, res) => {
  sendSuccessResponse(res, 'Tweet Auth Service');
});

export default router;
