const {
  mailActionsConstants: {
    CHANGE_PASSWORD,
    EMAIL_CONFIRM,
    UPDATE,
    DELETE
  }
} = require('../constants');

module.exports = {
  [EMAIL_CONFIRM]: {
    templateName: 'emailConfirmation',
    subject: 'Confirm your email'
  },
  [UPDATE]: {
    templateName: 'update',
    subject: 'Updated data'
  },
  [DELETE]: {
    templateName: 'delete',
    subject: 'Deteled user'
  },
  [CHANGE_PASSWORD]: {
    templateName: 'changePassword',
    subject: 'Change password'
  }
};
