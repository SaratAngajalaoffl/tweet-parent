import express from 'express';
import { createPost, getPostByIdHandler, getPostsHandler, handleCommentLike, postComment } from './post-handler';

const router = express.Router();

router.get('/get-posts', getPostsHandler);
router.get('/get-post/:postid', getPostByIdHandler);
router.post('/create-post', createPost);
router.post('/create-comment', postComment);
router.post('/like-comment', handleCommentLike);

export default router;
