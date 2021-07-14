const { responseCodes } = require('../constants');
const { UserModel } = require('../database');
const { ErrorHandler, errorMessages } = require('../errors');
const { userValidator } = require('../validators');

module.exports = {
  checkEmailBusy: async (req, res, next) => {
    try {
      const { email } = req.body;

      const userByEmail = await UserModel.findOne({ email });

      if (userByEmail) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.EMAIL_BUSY.message,
          errorMessages.EMAIL_BUSY.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsUserValidity: (req, res, next) => {
    try {
      const { error } = userValidator.createUser.validate(req.body);

      if (error) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.FIELD_NOT_FILLED.message(error.details[0].message),
          errorMessages.FIELD_NOT_FILLED.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  getUserByDynamicParam: (paramName, serchIn = 'body', dbKey = paramName) => async (req, res, next) => {
    try {
      const valueOfParam = req[serchIn][paramName];

      const user = await UserModel.findOne({ [dbKey]: valueOfParam }).select('+password');

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUpdateDatas: (req, res, next) => {
    try {
      const { error } = userValidator.updateUser.validate(req.body);

      if (error) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.FIELD_NOT_FILLED.message(error.details[0].message),
          errorMessages.FIELD_NOT_FILLED.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
