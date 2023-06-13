import express from 'express';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(express.json());

app.use(taskRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
