const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');

router.get('/', controller.readAllUsers);
router.post('/', controller.createNewUser, controller.readUserById);

router.get('/:id', controller.readUserById);

router.put('/:id', controller.updateUserById);
router.delete('/:id', controller.deleteUserById);

// Advance

router.post('/:userId/player', controller.readUserById, require('../controllers/playerController').createNewPlayer, controller.createNewRef);

router.get('/:userId/player/:playerId', controller.readRefById);
router.get('/:userId/player', controller.readAllUserRef);

router.put('/:userId/player/:playerId', controller.readUserById, require('../controllers/playerController').updatePlayerById, controller.updateRefById);

router.delete('/:userId/player/:playerId', controller.deleteRefById, require('../controllers/playerController').deletePlayerById);

module.exports = router;
