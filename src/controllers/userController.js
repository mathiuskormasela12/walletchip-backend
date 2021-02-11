// ==== import module
const response = require('../helpers/response')

// ===== import models
const userModel = require('../models/User')

const {
  APP_URL
} = process.env

exports.getAllUsers = async (req, res) => {
  const {
    page = 1,
    search = '',
    sort = 'ASC',
    limit = 4,
    by = 'username'
  } = req.query

  try {
    const startData = (limit * page) - limit
    const totalData = await userModel.getUserCount()
    const totalDataSearch = await userModel.getUserCountSearch({
      keyword: search,
      sort,
      offset: startData,
      limit,
      by
    })
    const totalPages = Math.ceil(totalData / limit)

    try {
      const results = await userModel.findAll({
        keyword: search,
        sort,
        offset: startData,
        limit,
        by
      })

      const modifiedTotalData = req.query.search ? totalDataSearch : totalData
      const modifiedTotalPage = req.query.search ? Math.ceil(modifiedTotalData / limit) : totalPages

      if (results.length < 1) {
        return response(res, 200, true, 'Data not available', results, modifiedTotalData, modifiedTotalPage, page, req)
      } else {
        const modifiedResults = results.map(item => ({
          ...item,
          picture: APP_URL.concat(`/uploads/${item.picture}`)
        }))
        return response(res, 200, true, 'Successfully to get all users', modifiedResults, modifiedTotalData, modifiedTotalPage, page, req)
      }
    } catch (err) {
      console.log(err)
      return response(res, 500, false, 'Failed to get user list, server error')
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Failed to get user count, server error')
  }
}
