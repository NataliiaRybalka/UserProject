require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const {
  envConstants: { MONGOOSE_URL, PORT },
  responseCodes
} = require('./constants');
const { errorMessages } = require('./errors');
const { userRouter } = require('./routes');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});

function _mongooseConnector() {
  mongoose.connect(MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

function _notFoundHandler(req, res, next) {
  next({
    status: responseCodes.NOT_FOUND,
    message: errorMessages.ROUT_NOT_FOUND.message,
    code: errorMessages.ROUT_NOT_FOUND.code
  });
}

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
  res
    .status(err.status)
    .json({
      message: err.message || 'Unknow error',
      code: err.code || 0
    });
}
