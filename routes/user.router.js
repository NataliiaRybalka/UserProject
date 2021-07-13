const router = require('express').Router();

const { userController } = require('../controllers');

router.post('/', userController);
router.get('/', userController);

router.get('/:userId', userController);
router.put('/:userId', userController);
router.delete('/:userId', userController);

module.exports = router;
