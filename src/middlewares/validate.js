import Joi from 'joi';

export const serviceSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  duration: Joi.number().positive().required(),
  price: Joi.number().positive().required(),
  category: Joi.string().min(1).required(),
  available: Joi.boolean().required()
});

export const bookingSchema = Joi.object({
  clientName: Joi.string().min(1).required(),
  clientEmail: Joi.string().email().required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
  status: Joi.string().required(),
  services: Joi.array().items(Joi.object({ service: Joi.any(), quantity: Joi.number().integer().min(1).default(1) })).optional()
});

export function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
    req.body = value;
    next();
  };
}
