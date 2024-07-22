import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bookRoutes from './Routes/bookRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import borrowingRoutes from './Routes/borrowingRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/borrowings', borrowingRoutes);

// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
