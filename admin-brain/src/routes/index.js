import express from 'express';
import { validateAdmin, validateUser } from '../helpers/jwt-helper';
import { approvePostHandler, blockPostHandler, getUnethicalPostsHandler } from './handler';

const router = express.Router();

router.get('/get-unethical-posts', validateUser, validateAdmin, getUnethicalPostsHandler);
router.post('/approve-post', validateUser, validateAdmin, approvePostHandler);
router.post('/block-post', validateUser, validateAdmin, blockPostHandler);

export default router;
