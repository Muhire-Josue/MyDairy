import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  firstname: Joi.string().trim().regex(/^[a-zA-Z]{3,30}$/).min(3)
    .max(30)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.type === 'any.empty') { err.message = 'Value should not be empty!'; }
        if (err.type === 'any.required') { err.message = 'Value is required!'; }
        if (err.type === 'string.base') { err.message = 'Value should be a string of characters!'; }
        if (err.type === 'string.regex.base') { err.message = 'Characters should be between 3-30'; }
      });
      return errors;
    }),
  lastname: Joi.string().trim().regex(/^[a-zA-Z]{3,30}$/).min(3)
    .max(30)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.type === 'any.empty') { err.message = 'Value should not be empty!'; }
        if (err.type === 'any.required') { err.message = 'Value is required!'; }
        if (err.type === 'string.base') { err.message = 'Value should be a string of characters!'; }
        if (err.type === 'string.regex.base') { err.message = 'Characters should be between 3-30'; }
      });
      return errors;
    }),
  email: Joi.string().email().required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.type === 'any.empty') { err.message = 'Value should not be empty!'; }
        if (err.type === 'any.required') { err.message = 'Value is required!'; }
        if (err.type === 'string.base') { err.message = 'Value should be a string of characters!'; }
        if (err.type === 'string.email') { err.message = 'Please provide a valid email!'; }
      });
      return errors;
    }),
  password: Joi.string().trim().min(3).required(),
});

export default userSchema;
