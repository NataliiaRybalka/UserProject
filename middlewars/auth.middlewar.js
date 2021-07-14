const {
  nameConstants: { AUTHORIZATION },
  responseCodes
} = require('../constants');
const { OAuthModel } = require('../database');
const { ErrorHandler, errorMessages } = require('../errors');
const { authService } = require('../services');

module.exports = {
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

      await authService.verifyToken(token);

      const objectByToken = await OAuthModel.findOne({ accessToken: token });

      if (!objectByToken) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.WRONG_TOKEN.message,
          errorMessages.WRONG_TOKEN.code
        );
      }

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

      await authService.verifyToken(token, 'refresh');

      const objectByToken = await OAuthModel.findOne({ refreshToken: token });

      if (!objectByToken) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.WRONG_TOKEN.message,
          errorMessages.WRONG_TOKEN.code
        );
      }

      req.user = objectByToken.user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
