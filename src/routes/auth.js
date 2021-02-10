// ======== Server
// import all modules
const express = require('express')

// import all controllers
const autoController = require('../controllers/authController')

// import all middlewares
const authMiddleware = require('../middlewares/auth')

// init router
const router = express.Router()

router.post(
  '/auth/pin',
  authMiddleware.checkId,
  authMiddleware.isPinEmpty,
  authMiddleware.isPinNumber,
  authMiddleware.isLength,
  autoController.createPin
)

router.patch(
  '/auth/pin/:id',
  authMiddleware.isPinEmpty,
  authMiddleware.isPinNumber,
  authMiddleware.isLength,
  autoController.changePin
)

router.post(
  '/auth/password',
  authMiddleware.checkEmail,
  autoController.getResetPasswordLink
)

router.patch(
  '/auth/password',
  authMiddleware.checkPassword,
  autoController.resetPassword
)

module.exports = router
