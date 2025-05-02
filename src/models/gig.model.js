import mongoose from "mongoose";

const GigSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  imagePublicId: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  artistName: { type: String, required: true },
  subtitle: { type: String, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Gigs", GigSchema);
