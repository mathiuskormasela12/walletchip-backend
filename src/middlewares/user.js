// ===== User Middleware
// import modules
const response = require('../helpers/response')
const config = require('../config/config')

exports.isGetUsersListValid = (req, res, next) => {
  const {
    page = 1,
    limit = 4,
    sort = 'ASC',
    by = ''
  } = req.query

  if (req.query.page && page.match(/[^0-9]/gi) !== null) {
    return response(res, 400, false, 'Invalid page')
  } else if (req.query.page && page < 1) {
    return response(res, 400, false, 'Invalid page')
  } else if (req.query.limit && typeof limit !== 'number' && limit < 1) {
    return response(res, 400, false, 'Invalid limit')
  } else if (req.query.limit && limit.toString().match(/[^0-9]/gi) !== null) {
    return response(res, 400, false, 'Invalid limit')
  } else if (req.query.sort && sort.toUpperCase() !== 'ASC' && sort.toUpperCase() !== 'DESC') {
    return response(res, 400, false, 'Invalid sort')
  } else if (req.query.by && config.validSort.indexOf(by) === -1) {
    return response(res, 400, false, 'Invalid query buy')
  }

  return next()
}
