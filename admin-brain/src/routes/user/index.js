import express from 'express';
import { getUserDetailsHandler, initiateUser } from './user-handler';

const router = express.Router();

router.post('/get-user', getUserDetailsHandler);
router.post('/initiate-user', initiateUser);

export default router;
