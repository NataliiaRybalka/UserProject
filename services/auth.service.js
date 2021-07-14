const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const {
  envConstants: { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET },
  nameConstants: { ACCESS, ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME }
} = require('../constants');

const verifyPromise = promisify(jwt.verify);

module.exports = {
  generateTokenPair: () => {
    const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TIME });
    const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_TIME });

    return { accessToken, refreshToken };
  },

  verifyToken: async (token, tokenType = ACCESS) => {
    const secredWord = tokenType === ACCESS ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

    await verifyPromise(token, secredWord);
  }
};
