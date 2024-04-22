var express = require('express');
var router = express.Router();
const { image } = require('../libs/multer');

router.post('/upload/image', image.single('image'), (req, res) => {
    let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    res.render('uploadedImage', { image_url: imageUrl });
});

module.exports = router;
