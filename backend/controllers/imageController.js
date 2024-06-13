const Image = require('../models/Image');
const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;
    cloudinary.uploader.upload(file.path, { resource_type: 'auto' }, async (error, result) => {
      if (error) {
        console.log("err",error)
        return res.status(500).json({ error: error.message });
      }
      const newImage = new Image({
        url: result.secure_url,
        caption: req.body.caption,
      });
      await newImage.save();
      return res.status(201).json(newImage);
    });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Extract public_id from Cloudinary URL
    const public_id = image.url.split('/').pop().split('.')[0];

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(public_id);

    res.status(200).json({ message: 'Image deleted' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.updateImage = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    image.caption = caption || image.caption;
    await image.save();
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
