// ======== Server
// import all modules
const express = require('express')

// import all controllers
const userController = require('../controllers/userController')

// import all middlewares
const userMiddleware = require('../middlewares/user')
const authMiddleware = require('../middlewares/auth')

// init router
const router = express.Router()

router.get(
  '/user',
  authMiddleware.authCheck,
  userMiddleware.isGetUsersListValid,
  userController.getAllUsers
)

router.patch(
  '/user/password/:id',
  authMiddleware.authCheck,
  userMiddleware.checkResetPassword,
  userController.resetPassword
)

router.patch(
  '/user/:id',
  authMiddleware.authCheck,
  userMiddleware.checkEditProfile,
  userController.editProfile
)

module.exports = router
