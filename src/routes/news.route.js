import { Router } from 'express';
import multer from 'multer';
import { createNews, getAllNews, updateNews, deleteNews } from '../controllers/news.controllers.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', protect, upload.single('image'), createNews);
router.get('/', getAllNews);
router.put('/:id', protect, upload.single('image'), updateNews);
router.delete('/:id', protect, deleteNews);

export default router;
