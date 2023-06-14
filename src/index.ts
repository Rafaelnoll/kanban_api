import 'dotenv/config';
import 'express-async-errors';
import express from 'express';

import taskRoutes from './routes/taskRoutes';
import categoryRoutes from './routes/categoryRoutes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use(taskRoutes);
app.use(categoryRoutes);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
