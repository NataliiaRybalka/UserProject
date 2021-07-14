const router = require('express').Router();

const { verifyController } = require('../controllers');

router.get('/:userId', verifyController.verifyEmail);

module.exports = router;
