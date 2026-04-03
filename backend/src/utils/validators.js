const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('donor', 'ngo', 'admin').required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
  organization: Joi.string().optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const donationSchema = Joi.object({
  foodName: Joi.string().min(3).max(100).required(),
  quantity: Joi.string().required(),
  foodType: Joi.string().required(),
  location: Joi.string().required(),
  expiryTime: Joi.date().required(),
  description: Joi.string().max(500).optional(),
});

const requestSchema = Joi.object({
  donationId: Joi.number().required(),
  notes: Joi.string().max(500).optional(),
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    req.validated = value;
    next();
  };
};

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  donationSchema,
  requestSchema,
};
