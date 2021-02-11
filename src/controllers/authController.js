// ==== import module
const bcrypt = require('bcryptjs')
const response = require('../helpers/response')
const jwt = require('jsonwebtoken')
const { SECRET } = process.env
const mailer = require('../helpers/mailer')

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
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Failed to change pin, server error')
  }
}

exports.register = async (req, res) => {
  const { username, email, password } = req.body
  const isUserNameExists = await userModel.getUsersByConditionAsync({ username })
  const isEmailExists = await userModel.getUsersByConditionAsync({ email })
  if (isUserNameExists.length < 1 && isEmailExists.length < 1) {
    const salt = await bcrypt.genSalt()
    const encryptedPassword = await bcrypt.hash(password, salt)
    const createUser = await userModel.createUserAsync({ username, email, password: encryptedPassword })
    if (createUser.insertId > 0) {
      const { insertId } = createUser
      mailer(email, 'Link activate Walletchip', `<div> <a href='http://127.0.0.1:8080/api/auth/verified/${insertId}'> </div>`)
      return response(res, 200, true, 'Register Success!')
    } else {
      return response(res, 400, false, 'Register Failed')
    }
  } else {
    if (isUserNameExists.length > 0 && isEmailExists.length > 0) {
      return response(res, 400, false, 'Register Failed, username and email already exists')
    } else if (isUserNameExists.length > 0) {
      return response(res, 400, false, 'Register Failed, username already exists')
    } else {
      return response(res, 400, false, 'Register Failed, email already exists')
    }
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  const existingUser = await userModel.getUsersByConditionAsync({ email })
  if (existingUser.length > 0) {
    const compare = await bcrypt.compare(password, existingUser[0].password)
    if (compare) {
      const { id, verified } = existingUser[0]
      if (verified === false) {
        return response(res, 400, false, 'You must verified your account first')
      }
      const token = jwt.sign({ id }, SECRET)
      return response(res, 200, true, 'Login successfully', { token })
    }
  }
  return res.status(401).json({
    success: false,
    message: 'Wrong email or password'
  })
}
