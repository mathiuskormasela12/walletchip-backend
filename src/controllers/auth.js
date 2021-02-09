// ==== import module
const response = require('../helpers/response')

exports.login = (req, res) => {
  return response(res, 200, true, 'berhasil', [], 20)
}
