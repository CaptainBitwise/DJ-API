import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
    images: [{
      url: { type: String, required: true },
      publicId: { type: String, required: true }
    }],
    createdAt: { type: Date, default: Date.now }
  });
  

export default mongoose.model('Gallery', GallerySchema);
