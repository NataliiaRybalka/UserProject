const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const {
  envConstants: { PASSWORD_TOKEN_SERCET },
  nameConstants: { PASSWORD_TOKEN_TIME }
} = require('../constants');

const verifyPromise = promisify(jwt.verify);

module.exports = {
  generatePasswordToken: () => {
    const passwordToken = jwt.sign({}, PASSWORD_TOKEN_SERCET, { expiresIn: PASSWORD_TOKEN_TIME });

    return { passwordToken };
  },

  verifyPasswordToken: async (token) => {
    await verifyPromise(token, PASSWORD_TOKEN_SERCET);
  }
};
