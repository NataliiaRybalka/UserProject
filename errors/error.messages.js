module.exports = {
  EMAIL_BUSY: {
    message: 'This email is already registered.',
    code: '401.1'
  },
  FIELD_NOT_FILLED: {
    message: (error) => error,
    code: '401.2'
  },
  MAX_SIZE_FOR_MEDIA: {
    message: (fileName, maxSize) => `${fileName} size is larger than ${maxSize}`,
    code: '415.1'
  },
  NO_TOKEN: {
    message: 'No token.',
    code: '401.3'
  },
  ONLY_ONE_FILE: {
    message: 'Only one file',
    code: '415.2'
  },
  RECORD_NOT_FOUND: {
    message: 'Record not found.',
    code: '404.1'
  },
  ROUT_NOT_FOUND: {
    message: 'Rout not found.',
    code: '404.2'
  },
  WRONG_EMAIL_OR_PASS: {
    message: 'Wrong email or password.',
    code: '401.4'
  },
  WRONG_MIMETYPE: {
    message: 'Mimetype is not supported',
    code: '415.3'
  },
  WRONG_TEMPLATE: {
    message: 'Wrong template.',
    code: '404.3'
  },
  WRONG_TOKEN: {
    message: 'Wrong token.',
    code: '401.5'
  }
};
