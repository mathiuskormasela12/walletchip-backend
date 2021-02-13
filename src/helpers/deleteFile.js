// ===== Delete File
// import fs
const fs = require('fs')

const {
  FILE_URL
} = process.env

module.exports = file => {
  fs.unlink(`${FILE_URL}/${file}`, err => {
    if (err) {
      console.log(err)
    }
  })
}
