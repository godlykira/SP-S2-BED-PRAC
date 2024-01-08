//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
const exampleController = require('../controllers/exampleController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const userController = require('../controllers/userController');

router.post('/login', userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post(
  '/register',
  userController.checkUsernameOrEmailExist,
  bcryptMiddleware.hashPassword,
  userController.register,
  jwtMiddleware.generateToken,
  jwtMiddleware.sendToken
);

router.post('/jwt/generate', exampleController.preTokenGenerate, jwtMiddleware.generateToken, exampleController.beforeSendToken, jwtMiddleware.sendToken);
router.get('/jwt/verify', jwtMiddleware.verifyToken, exampleController.showTokenVerified);
router.post('/bcrypt/compare', exampleController.preCompare, bcryptMiddleware.comparePassword, exampleController.showCompareSuccess);
router.post('/bcrypt/hash', bcryptMiddleware.hashPassword, exampleController.showHashing);

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;
