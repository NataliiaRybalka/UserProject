const { Schema, model } = require('mongoose');

const { databaseConstants: { USER } } = require('../constants');

const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false
  },
  isDelete: {
    type: Boolean
  },
  isActive: {
    type: Boolean
  },
  passwordToken: {
    type: String,
    required: true
  }
});

module.exports = model(USER, userSchema);
