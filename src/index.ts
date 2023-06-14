import express from 'express';
import taskRoutes from './routes/taskRoutes';
import categoryRoutes from './routes/categoryRoutes';

const app = express();

app.use(express.json());

app.use(taskRoutes);
app.use(categoryRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
