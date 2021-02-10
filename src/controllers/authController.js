// ==== import module
const bcrypt = require('bcryptjs')
const response = require('../helpers/response')

// ===== import models
const userModel = require('../models/User')

exports.createPin = async (req, res) => {
  try {
    const results = await userModel.findByCondition({
      id: req.params.id
    })

    if (results.length < 1) {
      return response(res, 400, false, 'Failed to create pin, unknown user id')
    } else {
      try {
        const results = await userModel.findByCondition({
          id: req.params.id
        })

        if (results[0].pin) {
          return response(res, 400, false, "Can't create pin, pin already there")
        } else {
          try {
            const pin = await bcrypt.hash(req.body.pin, 8)
            const results = await userModel.create(req.params.id, pin)

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
      } catch (error) {

      }
    }
  } catch (err) {
    response(res, 500, false, 'Failed to create pin, server error')
    throw new Error(err)
  }
}
