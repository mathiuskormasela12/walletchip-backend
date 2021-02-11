// ===== Auth Middleware
// import modules
const response = require('../helpers/response')
const { check, validationResult, query } = require('express-validator')

exports.checkId = [
  check('id', "Id can't be empty")
    .notEmpty(),
  check('id', 'Id must be a number')
    .isNumeric(),
  query('id', 'Id must be greater than 0')
    .isLength({
      min: 1
    }),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]

exports.checkEmail = [
  check('email', "Email can't be empty")
    .notEmpty(),
  check('email', 'Incorrect email')
    .isEmail(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]

exports.checkPassword = [
  check('id', "Id can't be empty")
    .notEmpty(),
  check('password', "Password can't be empty")
    .notEmpty(),
  check('email', "Email can't be empty")
    .notEmpty(),
  check('id', 'Id must be integer')
    .isInt(),
  check('email', 'Incorrect email')
    .isEmail(),
  check('password', 'Password length min 6 character')
    .isLength({
      min: 6
    }),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]

exports.isPinEmpty = [
  check('pin', "Pin can't be empty")
    .notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]

exports.isLength = [
  check('pin', 'Pin length must be 6 digits')
    .isLength({
      min: 6,
      max: 6
    }),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]

exports.isPinNumber = [
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
