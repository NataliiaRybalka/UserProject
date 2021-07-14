const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddlewar } = require('../middlewars');

router.post(
  '/',
  userMiddlewar.checkIsUserValidity,
  userMiddlewar.checkEmailBusy,
  userController.createUser
);
router.get('/', userController.getAllUsers);

router.use('/:userId', userMiddlewar.getUserByDynamicParam('userId', 'params', '_id'));

router.get('/:userId', userController.getUserById);
router.put('/:userId', userMiddlewar.checkUpdateDatas, userController.updateUserById);
// router.delete('/:userId', userController.deleteUserById);

module.exports = router;
