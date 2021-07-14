const { Schema, model } = require('mongoose');

const { databaseConstants: { O_AUTH, USER } } = require('../constants');

const OAuthShema = new Schema({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: USER
  }
}, {
  timestamps: true,
  toObject: { virtual: true },
  toJson: { virtual: true }
});

OAuthShema.pre('findOne', function() {
  this.populate('user');
});

module.exports = model(O_AUTH, OAuthShema);
