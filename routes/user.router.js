const router = require('express').Router();

const { userController } = require('../controllers');
const { authMiddlewar, userMiddlewar } = require('../middlewars');

router.post(
  '/',
  userMiddlewar.checkIsUserValidity,
  userMiddlewar.checkEmailBusy,
  userController.createUser
);

router.get('/', userController.getAllUsers);

router.use('/:userId', userMiddlewar.getUserByDynamicParam('userId', 'params', '_id'));

router.get('/:userId', userController.getUserById);

router.put(
  '/:userId',
  authMiddlewar.checkAccessToken,
  userMiddlewar.checkUpdateDatas('updateUser'),
  userController.updateUserById
);

router.delete(
  '/:userId',
  authMiddlewar.checkAccessToken,
  userController.deleteUserById
);

router.get(
  '/:userId/password',
  userController.getPasswordToken
);

module.exports = router;
