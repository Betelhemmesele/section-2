const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify your upload directory

const { uploadImage, getImages, deleteImage, updateImage, uploadMiddleware } = require('../controllers/imageController');

// router.post('/upload', uploadMiddleware, uploadImage);
router.post('/upload', upload.single('image'), uploadImage);

router.get('/', getImages);
router.delete('/:id', deleteImage);
router.put('/:id', updateImage);

module.exports = router;
