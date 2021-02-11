// ===== User
// import all modules
const Database = require('./Database')

class Transaction extends Database {
  constructor (table) {
    super()
    this.table = table
  }

  create (data) {
    const sql = `INSERT INTO ${this.table} 
                (${Object.keys(data[0]).map(item => `${item}`).join()})
                 VALUES ${data.map(item => `(${Object.values(item)
                    .map(item => `'${item}'`).join()})`)}`

    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, results) => {
        if (err) {
          return reject(err)
        } else if (results.affectedRows < 1) {
          resolve(false)
        } else {
          resolve(results.insertId)
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
}

module.exports = new Transaction('transactions')
