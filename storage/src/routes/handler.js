import { sendSuccessResponse } from '../helpers/response-helper';

export const uploadImages = async (req, res) => {
  return sendSuccessResponse(
    res,
    req.files.map((file) => `${req.protocol}://${req.get('host')}/${file.path.substr(8)}`)
  );
};
