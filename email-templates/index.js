const { mailActionsConstants: { REGISTER, UPDATE, DELETE } } = require('../constants');

module.exports = {
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
