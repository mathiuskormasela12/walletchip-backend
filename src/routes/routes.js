// ======== Server
// import all modules
const express = require('express')

// import all controllers
const autoController = require('../controllers/auth')

// init router
const router = express.Router()

router.get('/auth/login', autoController.login)

module.exports = router
