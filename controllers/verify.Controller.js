const { UserModel } = require('../database');

module.exports = {
  verifyEmail: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await UserModel.updateOne({ _id: userId }, { isActive: true });

      res.json(user);
    } catch (e) {
      next(e);
    }
  }
};
