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

const generateFileFilter = (mimetypes) => {
    return (req, file, callback) => {
        if (mimetypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            let err = new Error(`Only ${mimetypes} are allowed to upload!`);
            callback(err, false);
        }
    };
};

module.exports = {
    imageStorage: multer({
        storage: generateStorage('./public/images'),
        fileFilter: generateFileFilter([
            'image/png',
            'image/jpg',
            'image/jpeg'
        ]),
        onError: (err, next) => {
            next(err);
        }
    }),

    videoStorage: multer({
        storage: generateStorage('./public/videos'),
        fileFilter: generateFileFilter([
            'video/mp4',
            'video/mpeg',
            'video/webm'
        ]),
        onError: (err, next) => {
            next(err);
        }
    }),

    documentStorage: multer({
        storage: generateStorage('./public/documents'),
        fileFilter: generateFileFilter([
            'application/pdf',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]),
        onError: (err, next) => {
            next(err);
        }
    }),

    image: multer({
        fileFilter: generateFileFilter([
            'image/png',
            'image/jpg',
            'image/jpeg'
        ]),
        onError: (err, next) => {
            next(err);
        }
    }),

    video: multer({
        fileFilter: generateFileFilter([
            'video/mp4',
            'video/mpeg',
            'video/webm'
        ]),
        onError: (err, next) => {
            next(err);
        }
    }),

    document: multer({
        fileFilter: generateFileFilter([
            'text/plain',
            'application/pdf',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]),
        onError: (err, next) => {
            next(err);
        }
    })
};