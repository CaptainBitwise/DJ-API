import { body } from 'express-validator';

export const validateGalleryUpload = [
  (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    if (req.files.length > 10) {
      return res.status(400).json({ message: 'Cannot upload more than 10 images' });
    }

    const validFormats = ['image/jpeg', 'image/png', 'image/webp'];

    for (const file of req.files) {
      if (!validFormats.includes(file.mimetype)) {
        return res.status(400).json({ message: 'Invalid image format. Only jpg, png, webp allowed.' });
      }
    }

    next();
  }
];
