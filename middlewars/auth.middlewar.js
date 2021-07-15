const {
  nameConstants: { AUTHORIZATION },
  responseCodes
} = require('../constants');
const { OAuthModel, UserModel } = require('../database');
const { ErrorHandler, errorMessages } = require('../errors');
const { authService } = require('../services');

module.exports = {
  getUserByEmail: async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await UserModel.findOne({ email }).where({ isDelete: false }).select('+password');

      if (!user) {
        throw new ErrorHandler(
          responseCodes.NOT_FOUND,
          errorMessages.WRONG_EMAIL_OR_PASS.message,
          errorMessages.WRONG_EMAIL_OR_PASS.code
        );
      }

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.NO_TOKEN.message,
          errorMessages.NO_TOKEN.code
        );
      }

      const objectByToken = await OAuthModel.findOne({ accessToken: token });

      if (!objectByToken) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.WRONG_TOKEN.message,
          errorMessages.WRONG_TOKEN.code
        );
      }

      await authService.verifyToken(token);

      req.user = objectByToken.user;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkRefreshToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.NO_TOKEN.message,
          errorMessages.NO_TOKEN.code
        );
      }

      const objectByToken = await OAuthModel.findOne({ refreshToken: token });

      if (!objectByToken) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.WRONG_TOKEN.message,
          errorMessages.WRONG_TOKEN.code
        );
      }

      await authService.verifyToken(token, 'refresh');

      req.user = objectByToken.user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
