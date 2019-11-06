import db from '../models/index';
import failureResponse from '../helpers/failureResponse';

const checkDuplication = async (req, res, next) => {
  const { title } = req.body;
  const { rows } = await db.query('SELECT * FROM entries WHERE title=$1', [title]);
  if (rows[0]) {
    return failureResponse(res, 409, 'Title already exists');
  }
  return next();
};
export default checkDuplication;
