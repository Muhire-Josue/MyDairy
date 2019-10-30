import jwt from 'jsonwebtoken';

const tokenGenerator = (data) => {
  const token = jwt.sign(data, process.env.API_SERCRET_KEY);
  return token;
};
export default tokenGenerator;
