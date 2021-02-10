// ===== User
// import all modules
const Database = require('./Database')

class User extends Database {
  constructor (table) {
    super()
    this.table = table
  }

  create (id, pin) {
    const sql = `UPDATE ${this.table} SET ? WHERE id = ?`

    return new Promise((resolve, reject) => {
      this.db.query(sql, [{ pin }, id], (err, results) => {
        if (err) {
          return reject(err)
        } else if (results.affectedRows < 1) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  findByCondition (cond) {
    const sql = cond
      ? `SELECT * FROM ${this.table} 
    WHERE ${Object.keys(cond).map((item, index) => `${item} = ${Object.values(cond)[index]}`).join(' AND ')}`
      : `SELECT * FROM ${this.table}`

    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, results) => {
        if (err) {
          return reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
}

module.exports = new User('users')
