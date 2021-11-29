import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  pictures: [String],
  title: String,
  body: String,
  bullyRating: Number,
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    requried: true,
  },
  liked: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export const PostModel = mongoose.model('Post', PostSchema);
