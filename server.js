/* eslint-disable no-console */
import express from 'express';
import userRoutes from './server/routes/userRouter';
import entryRoutes from './server/routes/entryRouter';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(userRoutes);
app.use(entryRoutes);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
app.use((req, res, next) => {
  if (!req.route) {
    return res.status(400).json({ status: 400, error: 'Incorrect Route' });
  }
  return next();
});
// Error 500 Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.status(err.status).json({ status: err.status, error: err.message });
  return next();
});
export default app;
