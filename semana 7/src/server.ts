import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 


app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});