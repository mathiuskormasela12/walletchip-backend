// ======== Server
// import all modules
const express = require('express')

// import all controllers
const userController = require('../controllers/userController')

// import all middlewares
const userMiddleware = require('../middlewares/user')

// init router
const router = express.Router()

router.get(
  '/user',
  userMiddleware.isGetUsersListValid,
  userController.getAllUsers
)

module.exports = router
