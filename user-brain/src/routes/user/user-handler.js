import { sendErrorResponse, sendSuccessResponse } from '../../helpers/response-helper';
import { createUser, getUser } from '../../services/user-services';

export const getUserDetailsHandler = async (req, res) => {
  try {
    const user = await getUser(req.user.id);
    return sendSuccessResponse(res, user);
  } catch (err) {
    return sendErrorResponse(res, err.message);
  }
};

export const initiateUser = async (req, res) => {
  try {
    const user = await createUser(req.body);

    return sendSuccessResponse(res, user);
  } catch (err) {
    return sendErrorResponse(res, err.message);
  }
};
