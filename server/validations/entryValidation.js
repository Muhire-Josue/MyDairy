/* eslint-disable no-param-reassign */
import Joi from '@hapi/joi';

const entrySchema = Joi.object().keys({
  id: Joi.number().required(),
  title: Joi.string().trim().required()
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
          default:
            break;
        }
      });
      return errors;
    }),
  description: Joi.string().required()
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
          default:
            break;
        }
      });
      return errors;
    }),
});

export default entrySchema;
