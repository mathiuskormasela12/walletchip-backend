// ======== Transaction
// import all modules
const express = require('express')

// import all controllers
const transactionController = require('../controllers/transactionController')
const authMiddleware = require('../middlewares/auth')

// import all middlewares

// init router
const router = express.Router()

router.get(
  '/transaction-history',
  authMiddleware.authCheck,
  transactionController.getUserTransactionHistory
)

router.get(
  '/transaction-summary',
  authMiddleware.authCheck,
  transactionController.getUserTransactionSummary
)

module.exports = router
