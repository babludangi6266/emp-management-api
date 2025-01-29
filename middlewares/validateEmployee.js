
const Joi = require("joi");

const validateEmployee = (req, res, next) => {
  const schema = Joi.object({
    department_id: Joi.number().integer().required(),
    name: Joi.string().min(2).max(100).required(),
    dob: Joi.date().required(),
    phone: Joi.string().pattern(/^\d{10}$/).required(),
    photo: Joi.string().optional(),
    email: Joi.string().email().required(),
    salary: Joi.number().positive().required(),
    status: Joi.boolean().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

module.exports = validateEmployee;
