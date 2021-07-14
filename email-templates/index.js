const {
  mailActionsConstants: {
    EMAIL_CONFIRM,
    REGISTER,
    UPDATE,
    DELETE
  }
} = require('../constants');

module.exports = {
  [EMAIL_CONFIRM]: {
    templateName: 'emailConfirmation',
    subject: 'Confirm your email'
  },
  [REGISTER]: {
    templateName: 'register',
    subject: 'You are registered'
  },
  [UPDATE]: {
    templateName: 'update',
    subject: 'Updated data'
  },
  [DELETE]: {
    templateName: 'delete',
    subject: 'Deteled user'
  }
};
