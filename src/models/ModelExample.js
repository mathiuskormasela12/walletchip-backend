// ===== Model Example
// import db
const Database = require('./Database')

class ModelExample extends Database {
  getAll () {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users'
      this.db.query(sql, (err, results) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(results)
        }
      })
    })
  }
}

module.exports = new ModelExample()
