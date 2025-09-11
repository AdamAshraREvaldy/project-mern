const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // simpan ke public/uploads relatif dari root project
        cb(null, path.join(__dirname, '..', '..', 'public', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
    cb(new Error('Unsupported file format'), false);
    }
}

const upload = multer({ 
    storage, 
    limits: { fileSize: 3000000 }, 
    fileFilter 
});

module.exports = upload