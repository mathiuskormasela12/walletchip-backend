// ===== Database
const mysql = require('mysql')

class Database {
  constructor () {
    this.db = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    })
  }
}

module.exports = Database
