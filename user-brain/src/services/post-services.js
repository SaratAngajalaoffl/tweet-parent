import mongoose from 'mongoose';
import { PostModel } from '../models/post-model';
import { getCommentsByPostId } from './comment-services';

export const createNewPost = async (details) => {
  return await PostModel.create(details);
};

export const getPosts = async (pipeline = [{ $match: { bullyRating: { $lte: 0.5 } } }]) => {
  const posts = PostModel.aggregate(pipeline);
  PostModel.populate(posts, { path: 'owner' });
  return posts;
};

export const getPostById = async (postId) => {
  const post = await PostModel.findById(postId).populate('owner');

  const comments = await getCommentsByPostId(postId);

  return { ...post.toObject(), comments };
};

export const likePost = async (userId, postId) => {
  const post = await PostModel.findById(postId);

  post.liked.push(userId);

  post.save();

  return post;
};
