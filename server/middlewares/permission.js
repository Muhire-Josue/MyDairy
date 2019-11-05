/* eslint-disable consistent-return */
/* eslint-disable radix */
import failureResponse from '../helpers/failureResponse';
import db from '../models/index';
/**
   *@description Checks if user is granted access
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @param {number} status
   * @returns {object} response
   */
const permission = async (req, res, next) => {
  const id = req.params.entryId;
  const { rows } = await db.query('SELECT * FROM entries WHERE id=$1', [id]);

  const entry = rows[0];
  if (!entry) {
    return res.status(404).json({
      status: 404,
      error: 'Entry not found',
    });
  }
  if (entry.userId !== req.user.id) {
    return failureResponse(res, 403, 'Operation forbiden');
  }
  next();
};
export default permission;
