// ===== Transaction Middleware
// import modules
const response = require('../helpers/response')
const { check, validationResult } = require('express-validator')

exports.checkTransactionForm = [
  check('receiverId', "Receiver Id can't be empty")
    .notEmpty(),
  check('transactionDate', "Transaction Date can't be empty")
    .notEmpty(),
  check('note', "Note can't be empty")
    .notEmpty(),
  check('pin', "Pin can't be empty")
    .notEmpty(),
  check('amount', "Amount can't be empty")
    .notEmpty(),
  check('receiverId', 'Receiver Id must be a number')
    .isNumeric(),
  check('amount', 'Amount must be a greater than 0')
    .isInt({
      min: 1
    }),
  check('note', 'Note must be a string')
    .isString(),
  check('note', 'Note length max 100 characters')
    .isLength({
      max: 100
    }),
  check('pin', 'Pin length must be 6 digits')
    .isLength({
      min: 6,
      max: 6
    }),
  check('pin', 'Pin must be a number')
    .isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]
