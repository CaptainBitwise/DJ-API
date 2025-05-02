import { Router } from 'express';
import {
  createGallery,
  addImagesToGallery,
  reorderGallery,
  deleteImageFromGallery,
  deleteGallery,
  getGallery
} from '../controllers/galery.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import multer from 'multer';
import { validateGalleryUpload } from '../validations/galery.validations.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', protect, upload.array('images', 10), validateGalleryUpload, createGallery);
router.put('/:id/images', protect, upload.array('images', 10), validateGalleryUpload, addImagesToGallery);
router.patch('/:id/reorder', protect, reorderGallery);
router.patch('/:id/delete-image', protect, deleteImageFromGallery);
router.delete('/:id', protect, deleteGallery);

router.get('/', getGallery);


export default router;
