import {
    createGigService,
    getAllGigsService,
    updateGigService,
    deleteGigService
  } from '../services/gigs.service.js';
  
  export const createGig = async (req, res) => {
    try {
      const gig = await createGigService(req.body, req.file);
      res.status(201).json(gig);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getAllGigs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await getAllGigsService(page, limit);
        
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateGig = async (req, res) => {
    try {
      const { id } = req.params;
      const gig = await updateGigService(id, req.body, req.file);
      res.json(gig);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteGig = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteGigService(id);
      res.json({ message: 'Gig deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  