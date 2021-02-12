// ==== import module
const response = require('../helpers/response')

// ===== import models
const userModel = require('../models/Transaction')

exports.getUserTransactionHistory = async (req, res) => {
  const userID = req.userData.id
  console.log(userID)

  try {
    const results = await userModel.getUserTransactionHistory(userID)
    if (results.length < 1) {
      return response(res, 200, true, 'User has no transactional history')
    } else {
      return response(res, 200, true, 'User transactionals history list', results)
    }
  } catch (err) {
    response(res, 400, false, 'Failed to get user transactional history')
    throw new Error(err)
  }
}
