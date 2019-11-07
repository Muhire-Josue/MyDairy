/* eslint-disable no-param-reassign */
import Joi from '@hapi/joi';

const entrySchema = Joi.object().keys({
  title: Joi.string().trim().required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.type === 'any.empty') { err.message = 'Value should not be empty!'; }
        if (err.type === 'any.required') { err.message = 'Value is required!'; }
        if (err.type === 'string.base') { err.message = 'Value should be a string of characters!'; }
      });
      return errors;
    }),
  description: Joi.string().required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.type === 'any.empty') { err.message = 'Value should not be empty!'; }
        if (err.type === 'any.required') { err.message = 'Value is required!'; }
        if (err.type === 'string.base') { err.message = 'Value should be a string of characters!'; }
      });
      return errors;
    }),
});

export default entrySchema;
