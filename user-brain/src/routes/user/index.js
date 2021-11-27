import express from 'express';
import { getUserDetailsHandler } from './user-handler';

const router = express.Router();

router.post('/get-user', getUserDetailsHandler);

export default router;
