import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader === undefined) {
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized access',
    });
  }
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  req.token = bearerToken;
  // eslint-disable-next-line consistent-return
  return jwt.verify(req.token, process.env.API_SERCRET_KEY, (error, data) => {
    if (error) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid token',
      });
    }
    req.user = data;
    next();
  });
};

export default auth;
