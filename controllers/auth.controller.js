const {
  nameConstants: { AUTHORIZATION },
  responseCodes
} = require('../constants');
const { OAuthModel } = require('../database');
const { ErrorHandler, errorMessages } = require('../errors');
const { passwordHasher } = require('../services');
const authService = require('../services/auth.service');

module.exports = {
  login: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.WRONG_EMAIL_OR_PASS.message,
          errorMessages.WRONG_EMAIL_OR_PASS.code
        );
      }

      if (!req.user.isActive) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.WRONG_EMAIL_OR_PASS.message,
          errorMessages.WRONG_EMAIL_OR_PASS.code
        );
      }

      const { password: hashedPassword, _id } = req.user;
      const { password } = req.body;

      await passwordHasher.compare(hashedPassword, password);

      const tokenPair = authService.generateTokenPair();

      await OAuthModel.create({
        ...tokenPair,
        user: _id
      });

      res.status(responseCodes.CREATED).json({
        ...tokenPair,
        user: req.user
      });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      await OAuthModel.remove({ accessToken: token });

      res.status(responseCodes.NO_CONTENT).json('Logout success');
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const { refreshToken, _id } = req.user;

      await OAuthModel.remove({ refreshToken });

      const tokenPair = authService.generateTokenPair();

      await OAuthModel.create({
        ...tokenPair,
        user: _id
      });

      res.status(responseCodes.CREATED).json({
        ...tokenPair,
        user: req.user
      });
    } catch (e) {
      next(e);
    }
  }
};
