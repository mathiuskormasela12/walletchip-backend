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
  query('hash', "Hash can't be empty")
    .notEmpty(),
  check('password', "Password can't be empty")
    .notEmpty(),
  check('repeatPassword', "Repeat password can't be empty")
    .notEmpty()
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Password don't match")
      } else {
        return val
      }
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
