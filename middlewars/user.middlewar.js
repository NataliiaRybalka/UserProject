const {
  nameConstants: { AUTHORIZATION },
  responseCodes
} = require('../constants');
const { UserModel } = require('../database');
const { ErrorHandler, errorMessages } = require('../errors');
const { userService } = require('../services');
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

      const user = await UserModel.findOne({ [dbKey]: valueOfParam }).where({ isDelete: false }).select('+password');

      if (!user) {
        throw new ErrorHandler(
          responseCodes.NOT_FOUND,
          errorMessages.RECORD_NOT_FOUND.message,
          errorMessages.RECORD_NOT_FOUND.code
        );
      }

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUpdateDatas: (updateData) => (req, res, next) => {
    try {
      const { error } = userValidator[updateData].validate(req.body);

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

  checkPasswordToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.NO_TOKEN.message,
          errorMessages.NO_TOKEN.code
        );
      }

      const objectByToken = await UserModel.findOne({ passwordToken: token });

      if (!objectByToken) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.WRONG_TOKEN.message,
          errorMessages.WRONG_TOKEN.code
        );
      }

      await userService.verifyPasswordToken(token);

      req.user = objectByToken.user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
