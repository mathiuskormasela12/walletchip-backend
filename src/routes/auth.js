// ======== Server
// import all modules
const express = require('express')

// import all controllers
const authController = require('../controllers/authController')

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
  authController.createPin
)

router.patch(
  '/auth/pin/:id',
  authMiddleware.isPinEmpty,
  authMiddleware.isPinNumber,
  authMiddleware.isLength,
  authController.changePin
)

router.patch(
  '/auth/register',
  authMiddleware.isFieldsEmpty,
  authMiddleware.isFieldsLength,
  authController.register
)

router.post(
  '/auth/login',
  authController.login)

module.exports = router
