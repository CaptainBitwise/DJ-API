import {
    createGalleryService,
    addImagesToGalleryService,
    reorderGalleryService,
    deleteImageFromGalleryService,
    deleteGalleryService
  } from '../services/galery.service.js';
  
  
  import Gallery from '../models/galery.model.js';

  export const createGallery = async (req, res) => {
    try {
      console.log('FILES:', req.files); 
  
      const gallery = await createGalleryService(req.files);
      res.status(201).json(gallery);
    } catch (error) {
      console.error('Gallery creation error:', error.message); 
      res.status(500).json({ message: error.message });
    }
  };
  
  
  export const addImagesToGallery = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedGallery = await addImagesToGalleryService(id, req.files);
      res.json(updatedGallery);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const reorderGallery = async (req, res) => {
    try {
      const { id } = req.params;
      const { newOrder } = req.body;
      const updatedGallery = await reorderGalleryService(id, newOrder);
      res.json(updatedGallery);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteImageFromGallery = async (req, res) => {
    try {
      const { id } = req.params;
      const { imageUrl } = req.body;
      const updatedGallery = await deleteImageFromGalleryService(id, imageUrl);
      res.json(updatedGallery);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteGallery = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteGalleryService(id);
      res.json({ message: 'Gallery deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findOne();
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
