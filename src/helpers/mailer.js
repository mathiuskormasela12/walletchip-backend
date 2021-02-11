const mailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const config = require('../config/config')

module.exports = (receiver, title, message) => {
  const transporter = mailer.createTransport(smtpTransport(config.mailerOptions))

  const mailOptions = {
    from: config.mailerOptions.auth.user,
    to: receiver,
    subject: title,
    html: message
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw err
    }

    console.log(info)
  })
}
