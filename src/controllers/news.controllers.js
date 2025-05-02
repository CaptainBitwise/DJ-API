import {
    createNewService,
    getAllNewsService,
    updateNewsService,
    deleteNewsService
  } from '../services/news.service.js';
  
  export const createNews = async (req, res) => {
    try {
      const news = await createNewService(req.body, req.file);
      res.status(201).json(news);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getAllNews = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const result = await getAllNewsService(page, limit);
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  export const updateNews = async (req, res) => {
    try {
      const { id } = req.params;
      const news = await updateNewsService(id, req.body, req.file);
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteNews = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteNewsService(id);
      res.json({ message: 'News deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  