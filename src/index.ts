import 'dotenv/config';
import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import path from 'path';

import taskRoutes from './routes/taskRoutes';
import categoryRoutes from './routes/categoryRoutes';
import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';
import requestLimiter from './middlewares/requestLimiter';

const app = express();
const uploadsDirectoryPath = path.join(__dirname, '..', 'uploads');

app.use(cors());
app.use(express.json());
app.use(requestLimiter(300));
app.use('/uploads', express.static(uploadsDirectoryPath));

app.use(taskRoutes);
app.use(categoryRoutes);
app.use(userRoutes);

// This middleware must be the last
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
