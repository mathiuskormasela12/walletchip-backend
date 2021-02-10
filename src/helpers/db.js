// ====== Database
const mysql = require('mysql')
// const dotenv = require('dotenv').config()

// destructuring env
const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER
} = process.env

// const db = mysql.createConnection({
//   host: DATABASE_HOST,
//   user: DATABASE_USER,
//   password: DATABASE_PASSWORD,
//   database: DATABASE_NAME
// })

// db.connect()
// console.log(process.env.DATABASE_NAME)

// module.exports = db

// const mysql = require ('mysql')

const conn = mysql.createConnection({
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD
})

console.log(process.env.DATABASE_NAME)

conn.connect()

module.exports = conn
