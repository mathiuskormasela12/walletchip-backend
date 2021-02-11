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
    WHERE ${Object.keys(cond).map((item, index) => `${item} = '${Object.values(cond)[index]}'`).join(' AND ')}`
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

  updateByCondition (data, cond) {
    const sql = `UPDATE ${this.table}
    SET ? 
    WHERE ${Object.keys(cond).map((item, index) => `${item} = '${Object.values(cond)[index]}'`).join(' AND ')}`

    return new Promise((resolve, reject) => {
      this.db.query(sql, data, (err, results) => {
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

  getUserCount () {
    const sql = `SELECT COUNT('email') FROM ${this.table}`

    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, results) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(results[0]["COUNT('email')"])
        }
      })
    })
  }

  getUserCountSearch (data) {
    const sql = `SELECT COUNT('email') FROM ${this.table}
                 WHERE username LIKE '%${data.keyword}%' OR
                 email LIKE '%${data.keyword}%' OR
                 phone LIKE '%${data.keyword}%' 
                 ORDER BY ${data.by} ${data.sort}
                `

    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, results) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(results[0]["COUNT('email')"])
        }
      })
    })
  }

  findAll (data) {
    const sql = `SELECT id, email, first_name, 
                 last_name, username, phone, 
                 picture FROM ${this.table}
                 WHERE username LIKE '%${data.keyword}%' OR
                 email LIKE '%${data.keyword}%' OR
                 phone LIKE '%${data.keyword}%' 
                 ORDER BY ${data.by} ${data.sort}
                 LIMIT ${data.offset}, ${data.limit}
                `

    return new Promise((resolve, reject) => {
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

module.exports = new User('users')
