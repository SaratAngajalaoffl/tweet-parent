import express from 'express';
import { createPost, getPostByIdHandler, getPostsHandler } from './post-handler';

const router = express.Router();

router.get('/get-posts', getPostsHandler);
router.get('/get-post/:postid', getPostByIdHandler);
router.post('/create-post', createPost);

export default router;
