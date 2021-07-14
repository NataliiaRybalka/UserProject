const Joi = require('joi');

const { regexp: { EMAIL_REGEXP, PASSWORD_REGEXP } } = require('../constants');

module.exports = {
  createUser: Joi.object().keys({
    name: Joi.string().min(1).max(25).required(),
    email: Joi.string().regex(EMAIL_REGEXP).required(),
    password: Joi.string().regex(PASSWORD_REGEXP).required()
  }),

  updateUser: Joi.object().keys({
    name: Joi.string().min(1).max(25)
  })
};
