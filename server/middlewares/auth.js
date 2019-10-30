/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import failureResponse from '../helpers/failureResponse';

/**
   *@description Checks the token
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @param {number} status
   * @returns {object} response
   */
const auth = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader === undefined) {
    return failureResponse(res, 401, 'Unauthorized access');
  }
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  req.token = bearerToken;
  return jwt.verify(req.token, process.env.API_SERCRET_KEY, (error, data) => {
    if (error) {
      return failureResponse(res, 401, 'Invalid token');
    }
    req.user = data;
    next();
  });
};

export default auth;
