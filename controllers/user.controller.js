const responseCodes = require('../constants/response.codes');
const { UserModel } = require('../database');
const { passwordHasher } = require('../helpers');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordHasher.hash(password);
      const createdUser = await UserModel.create({ ...req.body, password: hashedPassword });

      res.status(responseCodes.CREATED).json(createdUser);
    } catch (e) {
      next(e);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserModel.find({});

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
      const user = req.body;

      await UserModel.updateOne(user);

      res.status(responseCodes.CREATED).json(user);
    } catch (e) {
      next(e);
    }
  }
};
