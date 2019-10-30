/* eslint-disable consistent-return */
/* eslint-disable radix */
import helperFunction from '../helpers/helperFunction';
import failureResponse from '../helpers/failureResponse';

/**
   *@description Checks if user is granted access
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @param {number} status
   * @returns {object} response
   */
const permission = (req, res, next) => {
  const id = parseInt(req.params.entryId);
  if (!Number.isInteger(id)) {
    return failureResponse(res, 400, 'Please provide a valid id');
    // return res.status(400).json({ status: 400, error: 'Please provide a valid id' });
  }
  const entry = helperFunction.findById(id);
  if (!entry) {
    return res.status(404).json({
      status: 404,
      error: 'Entry not found',
    });
  }
  if (entry.userId !== parseInt(req.user.id)) {
    return failureResponse(res, 403, 'Operation forbiden');
    // return res.status(403).json({ status: 403, error: 'Operation forbiden' });
  }
  next();
};
export default permission;
