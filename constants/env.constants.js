module.exports = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secredWord',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'example@gmail.com',
  ADMIN_EMAIL_PASSWORD: process.env.ADMIN_EMAIL_PASSWORD || '12345678',
  MONGOOSE_URL: process.env.MONGOOSE_URL || 'http://localhosh:3100',
  PASSWORD_TOKEN_SERCET: process.env.PASSWORD_TOKEN_SERCET || 'secredWord',
  PORT: process.env.PORT || 3100,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'secredWord'
};
