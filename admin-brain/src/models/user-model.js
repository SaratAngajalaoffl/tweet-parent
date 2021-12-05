import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    maxlength: 20,
    minlength: 3,
  },
  picture: {
    type: String,
  },
  following: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export const UserModel = mongoose.model('User', UserSchema);
