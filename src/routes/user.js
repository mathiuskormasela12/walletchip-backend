const express = require('express')

// import all controllers
const userController = require('../controllers/userController')

// import all middlewares
const authMiddleware = require('../middlewares/auth')

// init router
const router = express.Router()

router.get(
  '/dashboard/profile',
  authMiddleware.authCheck,
  userController.getUserDetails
)

router.patch(
  '/dashboard/update-profile',
  authMiddleware.authCheck,
  userController.updateUserDetails
)

module.exports = router
