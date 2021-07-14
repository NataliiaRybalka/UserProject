module.exports = {
  userNormalizator: (user) => {
    const fieldsToNormalize = [
      'password',
      'isDelete',
      'isActive',
      '__v'
    ];

    fieldsToNormalize.forEach((field) => {
      delete user[field];
    });

    return user;
  }
};
