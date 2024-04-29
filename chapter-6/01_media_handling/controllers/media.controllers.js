const imagekit = require('../libs/imagekit');
const path = require('path');
const qr = require('qr-image');

module.exports = {
    imageKitUpload: async (req, res, next) => {
        try {
            let strFile = req.file.buffer.toString('base64');

            let { url } = await imagekit.upload({
                fileName: Date.now() + path.extname(req.file.originalname),
                file: strFile
            });

            res.json({
                status: true,
                message: 'OK',
                data: url
            });
        } catch (error) {
            next(error);
        }
    },

    generateQR: async (req, res, next) => {
        try {
            let { qr_data } = req.body;
            if (!qr_data) {
                return res.status(400).json({
                    status: false,
                    message: 'qr_data is required',
                    data: null
                });
            }
            let qrCode = qr.imageSync(qr_data, { type: 'png' });

            let { url } = await imagekit.upload({
                fileName: Date.now() + '.png',
                file: qrCode.toString('base64')
            });

            res.json({
                status: true,
                message: 'OK',
                data: url
            });
        } catch (error) {
            next(error);
        }
    }
};