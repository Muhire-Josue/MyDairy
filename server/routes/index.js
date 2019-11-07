import express from 'express';
import userRoutes from './userRouter';
import entryRoutes from './entryRouter';

const app = express();
app.use(userRoutes);
app.use(entryRoutes);
export default app;
