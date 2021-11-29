import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  message: String,
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  liked: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'Post',
  },
  bullyRating: Number,
});

export const CommentModel = mongoose.model('Comment', CommentSchema);
