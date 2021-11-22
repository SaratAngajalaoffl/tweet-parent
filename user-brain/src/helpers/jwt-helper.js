import jwt from 'jsonwebtoken';
import { sendErrorResponse } from './response-helper';

export const validateUser = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token && token !== '') {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) return sendErrorResponse(res, err.message, 'UNAUTHORISED', 401);

      req.user = decoded;
      next();
    });
  } else {
    return sendErrorResponse(res, 'Unauthorised', 'UNAUTHORISED', 401);
  }
};

export const validateAdmin = (req, res, next) => {
  if (req.user.isAdmin) next();
  else return sendErrorResponse(res, 'Unauthorised, Not Admin', 'UNAUTHORISED, Not Admin', 401);
};

export const validateRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, function (error) {
      if (error) return reject(error);
      else resolve(true);
    });
  });
};
