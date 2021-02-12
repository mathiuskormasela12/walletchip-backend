const Database = require('./Database')

class User extends Database {
  constructor (table) {
    super()
    this.table = table
  }

  getUserTransactionHistory (id) {
    return new Promise((resolve, reject) => {
      this.db.query(`
      SELECT users1.username AS me,
      users2.username AS people,
      transactions.is_transfer,
      transactions.amount
      FROM transactions INNER JOIN
      users users1 ON users1.id = transactions.user_id
      INNER JOIN users users2 ON users2.id = transactions.receiver_id
      WHERE transactions.user_id = ${id}
      ORDER BY transactionDate DESC
    `, (err, res, field) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  }
}

module.exports = new User('transactions')
