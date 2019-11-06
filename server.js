/* eslint-disable no-console */
import express from 'express';
import routes from './server/routes/router';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(routes);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
app.use((req, res, next) => {
  if (!req.route) {
    return res.status(400).json({ status: 400, error: 'Incorrect Route' });
  }
  return next();
});
export default app;
