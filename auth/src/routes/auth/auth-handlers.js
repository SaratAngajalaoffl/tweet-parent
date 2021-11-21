import { getAccessToken } from '../../helpers/jwt-helper';
import { sendErrorResponse, sendSuccessResponse } from '../../helpers/response-helper';
import UserModel from '../../models/user-model';

export const loginUser = async (req, res) => {
  try {
    const { uid } = req.body;

    const user = await UserModel.findByPk(uid);

    if (!user) return sendErrorResponse(res, 'User Not Fount', 'User Not Found');

    const accessToken = await getAccessToken({ id: user.id, isAdmin: user.isAdmin });

    return sendSuccessResponse(res, { accessToken: accessToken }, 'User Logged In Successfully');
  } catch (err) {
    return sendErrorResponse(res, err.message);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { uid } = req.body;

    const user = await UserModel.create({ id: uid });

    console.log(`New User with id ${user.id} created!`);

    const accessToken = await getAccessToken({ id: user.id, isAdmin: user.isAdmin });

    return sendSuccessResponse(res, { accessToken: accessToken }, 'User Registered Successfully');
  } catch (err) {
    return sendErrorResponse(res, err.message);
  }
};
