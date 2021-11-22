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
});

export const UserModel = mongoose.Model('User', UserSchema);
