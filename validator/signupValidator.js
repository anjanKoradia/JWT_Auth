const Joi = require("joi");

const signupValidator = Joi.object({
    username: Joi.string().pattern(new RegExp('^[a-z]+$')).min(4).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]+$')).min(5).required(),
    fname: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).required(),
    lname: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).required(),
});

module.exports = signupValidator;
