import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  id: Joi.number().required(),
  firstname: Joi.string().regex(/^[a-zA-Z]{3,30}$/).min(3).max(30)
    .required(),
  lastname: Joi.string().regex(/^[a-zA-Z]{3,30}$/).min(3).max(30)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export default userSchema;
