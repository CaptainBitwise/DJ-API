import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 65 },
  description: { type: String, required: true, maxlength: 255 },
  link: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imagePublicId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('News', NewsSchema);
