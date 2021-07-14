module.exports = {
  EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
  PASSWORD_REGEXP: new RegExp('^(?=.*?[a-z])(?=.*?[0-9]).{6,}$')
};
