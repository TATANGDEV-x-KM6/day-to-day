var express = require('express');
var router = express.Router();
const { image, video, document } = require('../libs/multer');

// images
router.post('/upload/image', image.single('image'), (req, res) => {
    let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    res.json({ image_url: imageUrl });
});
router.post('/upload/images', image.array('image'), (req, res) => {
    let imageUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/images/${file.filename}`);
    res.json({ image_urls: imageUrls });
});

// videos
router.post('/upload/video', video.single('video'), (req, res) => {
    let videoUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;
    res.json({ video_url: videoUrl });
});
router.post('/upload/videos', video.array('video'), (req, res) => {
    let videoUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/videos/${file.filename}`);
    res.json({ video_urls: videoUrls });
});

// documents
router.post('/upload/document', document.single('document'), (req, res) => {
    let documentUrl = `${req.protocol}://${req.get('host')}/documents/${req.file.filename}`;
    res.json({ document_url: documentUrl });
});
router.post('/upload/documents', document.array('document'), (req, res) => {
    let documentUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/documents/${file.filename}`);
    res.json({ document_urls: documentUrls });
});

module.exports = router;
