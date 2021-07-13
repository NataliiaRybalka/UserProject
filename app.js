require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const {
  envConstants: { MONGOOSE_URL, PORT },
} = require('./constants');
const { userRouter } = require('./routes');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter);

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});

function _mongooseConnector() {
  mongoose.connect(MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
