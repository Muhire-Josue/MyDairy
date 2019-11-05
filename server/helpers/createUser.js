import hash from 'bcrypt-nodejs';
import uuid from 'uuid';
import db from '../models/index';

const user = {
  firstname: 'Josue',
  lastname: 'Rutayisire',
  email: 'muhirejosue09@gmail.com',
  password: 'user4',
};

const createUser = async (data = user) => {
  const {
    firstname, lastname, email, password,
  } = data;
  const text = `INSERT INTO
  users(id, firstname, lastname, email, password)
  VALUES($1, $2, $3, $4, $5)
  returning id, firstname, lastname, email, password, "createdDate"`;

  const values = [uuid.v1(), firstname, lastname, email, hash.hashSync(password)];

  const { rows } = await db.query(text, values);

  return rows[0];
};

export default createUser;
