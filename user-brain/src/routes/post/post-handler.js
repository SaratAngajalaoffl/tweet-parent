import { sendErrorResponse, sendSuccessResponse } from '../../helpers/response-helper';
import { createNewPost, getPostById, getPosts } from '../../services/post-services';

export const createPost = async (req, res) => {
  try {
    const post = await createNewPost(req.body);
    return sendSuccessResponse(res, post);
  } catch (err) {
    return sendErrorResponse(res, err.message);
  }
};

export const getPostsHandler = async (req, res) => {
  try {
    const posts = await getPosts();
    return sendSuccessResponse(res, posts);
  } catch (err) {
    return sendErrorResponse(res, err.message);
  }
};

export const getPostByIdHandler = async (req, res) => {
  try {
    const { postid } = req.params;
    const post = await getPostById(postid);
    return sendSuccessResponse(res, post);
  } catch (err) {
    return sendErrorResponse(res, err.message);
  }
};
