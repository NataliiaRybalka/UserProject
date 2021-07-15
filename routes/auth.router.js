const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddlewar } = require('../middlewars');

router.post('/login', authMiddlewar.getUserByEmail, authController.login);
router.post('/logout', authMiddlewar.checkAccessToken, authController.logout);
router.post('/refresh', authMiddlewar.checkRefreshToken, authController.refresh);

module.exports = router;
