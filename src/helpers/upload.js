// ===== Upload
// import all modules
const multer = require('multer')
const path = require('path')
const response = require('./response')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: (req, file, cb) => {
    const fileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    cb(null, fileName)
  }
})

const fileFilter = (req, file, cb) => {
  const validExt = ['image/png', 'image/jpg', 'image/jpeg']

  if (validExt.indexOf(file.mimetype) === -1) {
    cb(new Error('Failed to upload, only accept image file'), false)
  } else {
    cb(null, true)
  }
}

const limits = {
  fileSize: 1e+6
}

const upload = multer({ storage, fileFilter, limits }).single('picture')

module.exports = (req, res, next) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return response(res, 400, false, err.message)
    } else if (err) {
      console.log(err)
      return response(res, 400, false, err.message)
    }

    return next()
  })
}
