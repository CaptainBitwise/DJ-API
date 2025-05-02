import { Router } from 'express';
import { createGig, getAllGigs, deleteGig, updateGig } from '../controllers/gigs.controller.js';
import multer from 'multer';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();
const upload = multer({ dest: 'upload/' });

router.post('/', protect, upload.single('image'), createGig);
router.get('/', getAllGigs);
router.put('/:id', protect, upload.single('image'), updateGig);
router.delete('/:id', protect, deleteGig);

export default router;