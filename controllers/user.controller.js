const {
  envConstants: { PORT },
  mailActionsConstants: { EMAIL_CONFIRM, UPDATE, DELETE },
  responseCodes
} = require('../constants');
const { UserModel } = require('../database');
const {
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

      res.status(responseCodes.CREATED).json(createdUser);
    } catch (e) {
      next(e);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserModel.find({}).where({ isDelete: false });

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      const { user } = req;

      res.json(user);
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
        name: updateData.name,
        param: {
          name: updateData.name
        }
      });

      res.status(responseCodes.CREATED).json(user);
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
  }
};
