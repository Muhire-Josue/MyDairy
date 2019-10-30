import Joi from '@hapi/joi';

const entrySchema = Joi.object().keys({
  id: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export default entrySchema;
