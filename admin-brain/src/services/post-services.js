import { PostModel } from '../models/post-model';

export const getPosts = async (
    pipeline = [
        { $match: { bullyRating: { $gt: 0.5 } } },
        { $lookup: { from: 'users', localField: 'owner', foreignField: '_id', as: 'owner' } },
        { $unwind: '$owner' },
    ]
) => {
    var posts = PostModel.aggregate(pipeline);
    return posts;
};
