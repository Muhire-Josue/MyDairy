import entrySchema from '../validations/entryValidation';
import failureResponse from '../helpers/failureResponse';

const validations = (req, res, next) => {
  const validateEntry = entrySchema.validate({
    title: req.body.title, description: req.body.description,
  });
  if (validateEntry.error) {
    return failureResponse(res, 400, validateEntry.error.details[0].message);
  }
  return next();
};
export default validations;
