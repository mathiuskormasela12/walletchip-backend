// ===== Config
const {
  EMAIL_SERVICE,
  EMAIL_HOST,
  EMAIL,
  EMAIL_PASSWORD
} = process.env

module.exports = {
  mailerOptions: {
    service: EMAIL_SERVICE,
    host: EMAIL_HOST,
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD
    }
  }
}
