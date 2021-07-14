module.exports = {
  EMAIL_BUSY: {
    message: 'This email is already registered.',
    code: '401.1'
  },
  FIELD_NOT_FILLED: {
    message: (error) => error,
    code: '401.2'
  },
  WRONG_EMAIL_OR_PASS: {
    message: 'Wrong email or password.',
    code: '401.3'
  },
  ROUT_NOT_FOUND: {
    message: 'Rout not found.',
    code: '404.1'
  }
};
