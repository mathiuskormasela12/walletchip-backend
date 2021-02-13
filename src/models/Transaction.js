const Database = require('./Database')

class User extends Database {
  constructor (table) {
    super()
    this.table = table
  }

  getUserTransactionHistory (id) {
    return new Promise((resolve, reject) => {
      this.db.query(`
      SELECT users1.username AS user,
      users2.username AS another_user,
      transactions.is_transfer AS did_user_transfer,
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

  getUserTransactionSummary (id) {
    return new Promise((resolve, reject) => {
      const todayDate = new Date()
      const today = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 1)
      const todayString = today.toISOString().split('T')[0]
      const lastWeek = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 6)
      const lastWeekString = lastWeek.toISOString().split('T')[0]
      this.db.query(`
      SELECT users1.username AS user,
      transactionDate,
      transactions.is_transfer AS did_user_transfer,
      transactions.amount
      FROM transactions INNER JOIN
      users users1 ON users1.id = transactions.user_id
      INNER JOIN users users2 ON users2.id = transactions.receiver_id
      WHERE transactions.user_id = ${id} AND transactionDate >= '${lastWeekString}' AND transactionDate <= '${todayString}'
      ORDER BY transactionDate DESC
    `, (err, res, field) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  }
}

module.exports = new User('transactions')
