var express = require('express');
var router = express.Router();
const { image } = require('../libs/multer');

router.post('/upload/image', image.single('image'), (req, res) => {
    let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    res.json({ image_url: imageUrl });
});

router.post('/upload/images', image.array('image'), (req, res) => {
    let imageUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/images/${file.filename}`);
    res.json({ image_urls: imageUrls });
});

// single video (mp4, mpeg, mov)
// multiple video (mp4, mpeg, mov)
// single file (pdf, docx, xlxx)
// multiple file (pdf, docx, xlxx)

module.exports = router;
