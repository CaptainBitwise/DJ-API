import News from '../models/news.models.js';
import { uploadImage, deleteImage } from './cloudinary.service.js';

// Crear Noticia
export const createNewService = async (data, file) => {
  const { url, publicId } = await uploadImage(file.path, 'news_images');

  const news = new News({
    title: data.title,
    description: data.description,
    link: data.link,
    imageUrl: url,
    imagePublicId: publicId,
  });

  return await news.save();
};

// Obtener todas las Noticias
export const getAllNewsService = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
  
    const news = await News.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  
    const total = await News.countDocuments();
  
    return {
      news,
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  };
  

// Actualizar Noticia
export const updateNewsService = async (newsId, data, file) => {
  const news = await News.findById(newsId);
  if (!news) {
    throw new Error('News not found');
  }

  // Si viene nueva imagen, subimos y borramos la anterior
  if (file) {
    await deleteImage(news.imagePublicId); // eliminar imagen anterior de Cloudinary
    const { url, publicId } = await uploadImage(file.path, 'news_images');
    news.imageUrl = url;
    news.imagePublicId = publicId;
  }

  // Actualizar campos básicos
  news.title = data.title || news.title;
  news.description = data.description || news.description;
  news.link = data.link || news.link;

  return await news.save();
};

// Eliminar Noticia
export const deleteNewsService = async (newsId) => {
  const news = await News.findById(newsId);
  if (!news) {
    throw new Error('News not found');
  }

  await deleteImage(news.imagePublicId); // eliminar imagen en Cloudinary
  return await News.findByIdAndDelete(newsId);
};
