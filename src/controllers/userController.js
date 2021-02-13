// ==== import module
const response = require('../helpers/response')

// ===== import models
const userModel = require('../models/User')

exports.getUserDetails = async (req, res) => {
  const userID = req.userData.id
  try {
    const results = await userModel.getUsersByIdAsync(userID)

    if (results.length < 1) {
      return response(res, 400, false, 'Unknown user')
    } else {
      return response(res, 200, true, 'User details', ...results)
    }
  } catch (err) {
    response(res, 400, false, 'Failed to get user details')
    throw new Error(err)
  }
}

exports.updateUserDetails = async (req, res) => {
  const userID = req.userData.id
  const data = req.body
  try {
    const results = await userModel.updateUserDetails(userID, data)
    if (results.length < 1) {
      return response(res, 400, false, 'Unknown user')
    } else {
      return response(res, 200, true, 'User profile successfully updated', { ...data })
    }
  } catch (err) {
    response(res, 400, false, 'Failed to update user profile')
    throw new Error(err)
  }
}
