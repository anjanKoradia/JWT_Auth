const Joi = require("joi");

const signinValidator = Joi.object({
    username: Joi.string().pattern(new RegExp('^[a-z]')).min(4).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]')).min(5).required()
});

module.exports = signinValidator;
