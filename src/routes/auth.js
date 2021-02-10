// ======== Server
// import all modules
const express = require('express')

// import all controllers
const autoController = require('../controllers/authController')

// import all middlewares
const authMiddleware = require('../middlewares/auth')

// init router
const router = express.Router()

router.patch(
  '/auth/pin/:id',
  authMiddleware.isPinEmpty,
  authMiddleware.isPinNumber,
  authMiddleware.isLength,
  autoController.createPin
)

module.exports = router
