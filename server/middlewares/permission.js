/* eslint-disable consistent-return */
/* eslint-disable radix */
import helperFunction from '../helpers/helperFunction';

const permission = (req, res, next) => {
  const id = parseInt(req.params.entryId);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ status: 400, error: 'Please provide a valid id' });
  }
  const entry = helperFunction.findById(id);
  if (!entry) {
    return res.status(404).json({
      status: 404,
      error: 'Entry not found',
    });
  }
  if (entry.userId !== parseInt(req.user.id)) {
    return res.status(403).json({ status: 403, error: 'Operation forbiden' });
  }
  next();
};
export default permission;
