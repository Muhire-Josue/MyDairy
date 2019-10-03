import Joi from '@hapi/joi';

const entrySchema = Joi.object().keys({
  id: Joi.number().required(),
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(30).required(),
});

export default entrySchema;
