// ==== import module
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailer = require('../helpers/mailer')
const response = require('../helpers/response')

// ===== import models
const userModel = require('../models/User')

exports.createPin = async (req, res) => {
  try {
    const results = await userModel.findByCondition({
      id: req.query.id
    })

    if (results.length < 1) {
      return response(res, 400, false, 'Failed to create pin, unknown user id')
    } else {
      try {
        const results = await userModel.findByCondition({
          id: req.query.id
        })

        if (results[0].pin) {
          return response(res, 400, false, 'Failed to create pin, pin already there')
        } else {
          try {
            const pin = await bcrypt.hash(req.body.pin, 8)
            const results = await userModel.create(req.query.id, pin)

            if (!results) {
              return response(res, 400, false, 'Failed to create pin')
            } else {
              return response(res, 200, true, 'Success to create pin')
            }
          } catch (err) {
            response(res, 500, false, 'Failed to create pin, server error')
            throw new Error(err)
          }
        }
      } catch (err) {
        response(res, 500, false, 'Failed to create pin, server error')
        throw new Error(err)
      }
    }
  } catch (err) {
    response(res, 500, false, 'Failed to create pin, server error')
    throw new Error(err)
  }
}

exports.changePin = async (req, res) => {
  try {
    const results = await userModel.findByCondition({
      id: req.params.id
    })

    if (results.length < 1) {
      return response(res, 400, false, 'Failed to change pin, unknown user id')
    } else {
      try {
        const pin = await bcrypt.hash(req.body.pin, 8)
        const results = await userModel.create(req.params.id, pin)

        if (!results) {
          return response(res, 400, false, 'Failed to change pin')
        } else {
          return response(res, 200, true, 'Success to change pin')
        }
      } catch (err) {
        response(res, 500, false, 'Failed to change pin, server error')
        throw new Error(err)
      }
    }
  } catch (err) {
    response(res, 500, false, 'Failed to change pin, server error')
    throw new Error(err)
  }
}

exports.getResetPasswordLink = async (req, res) => {
  const {
    email
  } = req.body

  const {
    SECRET
  } = process.env

  try {
    const results = await userModel.findByCondition({
      email
    })

    if (results.length < 1) {
      return response(res, 400, false, 'Unknown email')
    } else {
      const hash = jwt.sign({
        id: results[0].id,
        email
      }, SECRET)
      mailer(
        email,
        'Forgot Password',
        `<div>
          <h3>Please click link below to reset your password</h3>
          <a href="${process.env.APP_URL}/auth/password?hash=${hash}">Click Me</a>
        </div>`
      )

      return response(res, 200, true, 'Please check your email for reset your password')
    }
  } catch (err) {
    response(res, 500, false, 'Failed to send reset password link, server error')
    throw new Error(err)
  }
}

exports.resetPassword = async (req, res) => {
  const {
    SECRET
  } = process.env

  try {
    const { id, email } = jwt.verify(req.query.hash, SECRET)
    try {
      const password = await bcrypt.hash(req.body.password, 8)
      const results = await userModel.updateByCondition({ password }, { id, email })

      if (!results) {
        return response(res, 400, false, 'Failed to reset password')
      } else {
        return response(res, 200, false, 'Successfully to reset password')
      }
    } catch (error) {
      response(res, 500, false, 'Failed to reset password, server error')
      throw new Error(error)
    }
  } catch (error) {
    response(res, 500, false, `${error.message}`)
    throw new Error(error)
  }
}
