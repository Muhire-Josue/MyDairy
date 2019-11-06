import userSchema from '../validations/userValidation';
import failureResponse from '../helpers/failureResponse';

const validate = (req, res, next) => {
  const user = req.body;
  const {
    firstname, lastname, email, password,
  } = user;
  const validateUser = userSchema.validate({
    firstname, lastname, email, password,
  });
  if (validateUser.error) {
    return failureResponse(res, 400, validateUser.error.details[0].message);
  }
  return next();
};
export default validate;
