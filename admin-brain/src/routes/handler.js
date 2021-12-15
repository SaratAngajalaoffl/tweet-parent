import { sendErrorResponse, sendSuccessResponse } from '../helpers/response-helper';
import { PostModel } from '../models/post-model';
import { getPosts } from '../services/post-services';

export const getUnethicalPostsHandler = async (res, res) => {
    try {
        const posts = await getPosts();
        return sendSuccessResponse(res, posts);
    } catch (err) {
        return sendErrorResponse(res, err.message);
    }
};

export const approvePostHandler = async (res, res) => {
    try {
        const { postId } = req.body;
        await PostModel.findByIdAndUpdate(postId, { $set: { bullyRating: 0.0 } });
        return sendSuccessResponse(res, 'Success');
    } catch (err) {
        return sendErrorResponse(res, err.message);
    }
};
export const blockPostHandler = async (res, res) => {
    try {
        const { postId } = req.body;
        await PostModel.findByIdAndUpdate(postId, { $set: { bullyRating: 0.5 } });
        return sendSuccessResponse(res, 'Success');
    } catch (err) {
        return sendErrorResponse(res, err.message);
    }
};
