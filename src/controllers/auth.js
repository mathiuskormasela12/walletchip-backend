// ==== import module
const response = require('../helpers/response')

// ===== import models
const userModel = require('../models/ModelExample')

exports.login = async (req, res) => {
  try {
    const results = await userModel.getAll()
    /*
      Standard Response example
      return response(res, status, success, message, results)
    */
    return response(res, 200, true, 'This is message', results)
  } catch (err) {
    response(res, 500, true, 'This is message')
    throw new Error(err)
  }
}
