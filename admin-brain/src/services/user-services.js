import { sendErrorResponse, sendSuccessResponse } from '../helpers/response-helper';
import { UserModel } from '../models/user-model';

export const getUser = async (userId) => {
  try {
    const user = await UserModel.findOne({ authId: userId });

    return user;
  } catch (err) {
    throw err;
  }
};

export const createUser = async (details) => {
  return await UserModel.create(details);
};
