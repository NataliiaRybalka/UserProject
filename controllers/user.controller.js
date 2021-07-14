const {
  envConstants: { PORT },
  mailActionsConstants: {
    CHANGE_PASSWORD,
    EMAIL_CONFIRM,
    UPDATE,
    DELETE
  },
  responseCodes
} = require('../constants');
const { UserModel } = require('../database');
const { userHelper } = require('../helpers');
const {
  userService,
  mailService: { sendMail },
  passwordHasher
} = require('../services');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { email, name, password } = req.body;
      const hashedPassword = await passwordHasher.hash(password);
      const createdUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
        isDelete: false,
        isActive: false
      });

      await sendMail(email, EMAIL_CONFIRM, { name, verifyLink: `http://localhost:${PORT}/verify/${createdUser._id}` });
      const userNormalized = await userHelper.userNormalizator(createdUser.toJSON());

      res.status(responseCodes.CREATED).json(userNormalized);
    } catch (e) {
      next(e);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserModel.find({}).where({ isDelete: false });
      const userNormalized = [];

      await users.map((user) => {
        const newUser = userHelper.userNormalizator(user.toJSON());
        userNormalized.push(newUser);
        return userNormalized;
      });

      res.json(userNormalized);
    } catch (e) {
      next(e);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { user } = req;
      const userNormalized = await userHelper.userNormalizator(user.toJSON());

      res.json(userNormalized);
    } catch (e) {
      next(e);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      const updateData = req.body;
      const { user } = req;

      await UserModel.updateOne({ _id: user._id }, { name: updateData.name });
      await sendMail(user.email, UPDATE, {
        name: user.name,
        param: {
          name: updateData.name
        }
      });

      const userNormalized = await userHelper.userNormalizator(user.toJSON());

      res.status(responseCodes.CREATED).json(userNormalized);
    } catch (e) {
      next(e);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { _id, email, name } = req.user;

      await UserModel.findOneAndUpdate({ _id }, { isDelete: true });
      await sendMail(email, DELETE, { name });

      res.status(responseCodes.NO_CONTENT).json(_id);
    } catch (e) {
      next(e);
    }
  },

  getPasswordToken: async (req, res, next) => {
    try {
      const { user } = req;

      const token = userService.generatePasswordToken();

      await sendMail(user.email, CHANGE_PASSWORD, { name: user.name, passwordToken: token.passwordToken });

      const userNormalized = await userHelper.userNormalizator(user.toJSON());

      await UserModel.updateOne({
        passwordToken: token.passwordToken,
        user: user._id
      });

      res.status(responseCodes.CREATED).json({
        passwordToken: token.passwordToken,
        user: userNormalized
      });
    } catch (e) {
      next(e);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const { password } = req.body;
      const { user } = req;

      const hashedPassword = await passwordHasher.hash(password);

      await UserModel.updateOne({ _id: user._id }, { password: hashedPassword });

      const userNormalized = await userHelper.userNormalizator(user.toJSON());

      res.status(responseCodes.CREATED).json(userNormalized);
    } catch (e) {
      next(e);
    }
  }
};
