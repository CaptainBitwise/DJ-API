import Gigs from "../models/gig.model.js";
import { uploadImage, deleteImage } from "./cloudinary.service.js";

export const createGigService = async (data, file) => {
  const { url, publicId } = await uploadImage(file.path, 'gigs_images');

  const gig = new Gigs({
    imageUrl: url,
    imagePublicId: publicId,
    date: data.date,
    location: data.location,
    artistName: data.artistName,
    subtitle: data.subtitle,
    link: data.link,
  });

  return await gig.save();
};

export const getAllGigsService = async (page = 1, limit = 10) => {
    const skip = (page -1 ) * limit;

    const gigs = await Gigs.find()
       .sort({ createdAt: -1 })
       .skip(skip)
       .limit(limit);
    
    const total = await Gigs.countDocuments();

    return {
        gigs,
        total,
        page,
        pages: Math.ceil(total / limit)
    };
};

export const updateGigService = async (gigId, data, file) => {
  const gig = await Gigs.findById(gigId);
  if (!gig) {
    throw new Error('Gig not found');
  }

  if (file) {
    await deleteImage(gig.imagePublicId); 
    const { url, publicId } = await uploadImage(file.path, 'gigs_images');
    gig.imageUrl = url;
    gig.imagePublicId = publicId;
  }

  gig.date = data.date || gig.date;
  gig.location = data.location || gig.location;
  gig.artistName = data.artistName || gig.artistName;
  gig.subtitle = data.subtitle || gig.subtitle;
  gig.link = data.link || gig.link;

  return await gig.save();
};

export const deleteGigService = async (gigId) => {
  const gig = await Gigs.findById(gigId);
  if (!gig) {
    throw new Error('Gig not found');
  }

  await deleteImage(gig.imagePublicId);

  return await Gigs.findByIdAndDelete(gigId);
};
