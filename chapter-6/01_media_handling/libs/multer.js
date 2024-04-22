const multer = require('multer');
const path = require('path');

const filename = (req, file, callback) => {
    let fileName = Date.now() + path.extname(file.originalname);
    callback(null, fileName);
};

const generateStorage = (destination) => {
    return multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, destination);
        },
        filename: filename
    });
};

module.exports = {
    image: multer({
        storage: generateStorage('./public/images'),
        fileFilter: (req, file, callback) => {
            let allowedMimetypes = ['image/png', 'image/jpg', 'image/jpeg'];
            if (allowedMimetypes.includes(file.mimetype)) {
                callback(null, true);
            } else {
                let err = new Error(`Only ${allowedMimetypes} are allowed to upload!`);
                callback(err, false);
            }
        },
        onError: (err, next) => {
            next(err);
        }
    })
};