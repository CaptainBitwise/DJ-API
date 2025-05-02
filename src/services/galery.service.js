import Gallery from "../models/galery.model.js";
import { uploadImage, deleteImage } from "./cloudinary.service.js";

export const createGalleryService = async (files) => {
  const imageUrls = [];

  for (const file of files) {
    const url = await uploadImage(file.path, "gallery_images");
    imageUrls.push(url);
  }

  const gallery = new Gallery({ images: imageUrls });
  return await gallery.save();
};

export const addImagesToGalleryService = async (galleryId, files) => {
  const gallery = await Gallery.findById(galleryId);
  if (!gallery) {
    throw new Error("Gallery not found");
  }

  for (const file of files) {
    const url = await uploadImage(file.path, "gallery_images");
    gallery.images.push(url);
  }

  return await gallery.save();
};

export const reorderGalleryService = async (galleryId, newOrder) => {
  const gallery = await Gallery.findById(galleryId);
  if (!gallery) {
    throw new Error("Gallery not found");
  }

  gallery.images = newOrder;
  return await gallery.save();
};

export const deleteImageFromGalleryService = async (
  galleryId,
  publicIdToDelete
) => {
  const gallery = await Gallery.findById(galleryId);
  if (!gallery) {
    throw new Error("Gallery not found");
  }

  const imageToDelete = gallery.images.find(
    (img) => img.publicId === publicIdToDelete
  );
  if (!imageToDelete) {
    throw new Error("Image not found in gallery");
  }

  await deleteImage(publicIdToDelete);

  gallery.images = gallery.images.filter(
    (img) => img.publicId !== publicIdToDelete
  );
  return await gallery.save();
};

export const deleteGalleryService = async (galleryId) => {
  return await Gallery.findByIdAndDelete(galleryId);
};
