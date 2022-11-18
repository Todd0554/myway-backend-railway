import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()
// create a storage to store the file
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'upload/')
    },
    filename(req, file, cb) {
        cb(
            null, 
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
            )
    }
})

// check file type
const checkFileType = (file, cb) => {
    // define what type is permitted
    const fileTypes = /jpg|jpeg|png/
    // check file extname
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    // check media type
    const mimetype = fileTypes.test(file.mimetype)
    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb(new Error('The image should be jpg, png or jpeg.'))
    }
}

// upload file
const upload = multer({
    storage, 
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

// create upload router
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router