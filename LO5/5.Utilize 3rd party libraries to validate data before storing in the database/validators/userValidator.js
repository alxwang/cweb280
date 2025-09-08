const Joi = require('joi');

const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).max(120).required()
});

module.exports = { userSchema };
