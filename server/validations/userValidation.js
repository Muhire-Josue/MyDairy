/* eslint-disable no-param-reassign */
import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  id: Joi.number().required(),
  firstname: Joi.string().trim().regex(/^[a-zA-Z]{3,30}$/).min(3)
    .max(30)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.empty':
            err.message = 'Value should not be empty!';
            break;
          case 'any.required':
            err.message = 'Value is required!';
            break;
          case 'string.base':
            err.message = 'Value should be a string of characters!';
            break;
          case 'string.trim':
            err.message = 'Value should be not contain whitespaces!';
            break;
          case 'string.regex.base':
            err.message = 'Characters should be between 3-30';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  lastname: Joi.string().trim().regex(/^[a-zA-Z]{3,30}$/).min(3)
    .max(30)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.empty':
            err.message = 'Value should not be empty!';
            break;
          case 'any.required':
            err.message = 'Value is required!';
            break;
          case 'string.base':
            err.message = 'Value should be a string of characters!';
            break;
          case 'string.trim':
            err.message = 'Value should not contain whitespaces!';
            break;
          case 'string.regex.base':
            err.message = 'Characters should be between 3-30';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  email: Joi.string().email().required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.empty':
            err.message = 'Value should not be empty!';
            break;
          case 'any.required':
            err.message = 'Value is required!';
            break;
          case 'string.base':
            err.message = 'Value should be a string of characters!';
            break;
          case 'string.trim':
            err.message = 'Value should be not contain whitespaces!';
            break;
          case 'string.email':
            err.message = 'Please provide a valid email!';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  password: Joi.string().trim().min(3).required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.empty':
            err.message = 'Value should not be empty!';
            break;
          case 'any.required':
            err.message = 'Value is required!';
            break;
          case 'string.base':
            err.message = 'Value should be a string of characters!';
            break;
          case 'string.trim':
            err.message = 'Value should be not contain whitespaces!';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

export default userSchema;
