const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');

router.get('/', controller.readAllUsers);
router.post('/', controller.createNewUser, controller.readUserById);

router.get('/:id', controller.readUserById);

router.put('/:id', controller.updateUserById);
router.delete('/:id', controller.deleteUserById);

module.exports = router;
