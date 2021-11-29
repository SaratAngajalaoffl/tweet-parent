import mongoose from 'mongoose';
import { CommentModel } from '../models/comment-model';

export const getCommentsByPostId = async (postId) => {
  const comments = CommentModel.find({ post: mongoose.Types.ObjectId(postId) }).populate('owner');
};

export const createComment = async (details) => {
  return await CommentModel.create(details);    
};

export const likeComment = async (userId, commentId) => {
  const comment = await CommentModel.findById(commentId);

  comment.liked.push(userId);

  await comment.save();

  return comment;
};
