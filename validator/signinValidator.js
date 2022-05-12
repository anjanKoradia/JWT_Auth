const Joi = require("joi");
const { joiPassword } = require('joi-password');

const signinValidator = Joi.object({
    username: Joi.string().pattern(new RegExp('^[a-z]{4,50}$')).message("username check failed").required(),
    password: joiPassword.string().minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).required().messages({
        'password.minOfUppercase': 'password check failed',
        'password.minOfLowercase': 'password check failed',
        'password.minOfNumeric': 'password check failed',
    })
});

module.exports = signinValidator;

