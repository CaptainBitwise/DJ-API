import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import newsRoutes from './routes/news.route.js';
import gigRoutes from './routes/gig.route.js';
import galleryRoutes from './routes/galery.routes.js';


const app = express();

app.use(cors({
    origin: ['https://jeim-music.vercel.app'],
    credentials: true,
    
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/news', newsRoutes);
app.use('/v1/api/gigs', gigRoutes);
app.use('/v1/api/gallery/', galleryRoutes);

export default app;
