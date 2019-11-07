/* eslint-disable max-len */
import hash from 'bcrypt-nodejs';
import dotenv from 'dotenv';
import uuid from 'uuid';
import db from '../models/index';
import failureResponse from '../helpers/failureResponse';
import successResponse from '../helpers/successResponse';
import tokenGenerator from '../helpers/userTokenGenerator';

dotenv.config();

class userController {
  static entryMessage(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'welcome to MyDiary application',
    });
  }

  static async createAccount(req, res) {
    const user = req.body;
    const {
      firstname, lastname, email, password,
    } = user;
    user.password = hash.hashSync(user.password);

    const text = `INSERT INTO
    users(id, firstname, lastname, email, password)
    VALUES($1, $2, $3, $4, $5)
    returning id, firstname, lastname, email, password, "createdDate"`;
    const values = [uuid.v1(), firstname, lastname, email, hash.hashSync(password)];
    const checkUser = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    if (checkUser.rows.length > 0) {
      return failureResponse(res, 409, 'Email already exists');
    }
    const { rows } = await db.query(text, values);
    const tokenData = {
      id: rows[0].id, firstname: rows[0].firstname, lastname: rows[0].lastname, email: rows[0].email,
    };
    const token = tokenGenerator(tokenData);
    const data = {
      token, id: rows[0].id, firstname: rows[0].firstname, lastname: rows[0].lastname, email: rows[0].email,
    };
    return successResponse(res, 201, 'User created successfully!', data);
  }

  static async Login(req, res) {
    const { email, password } = req.body;
    const { rows } = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    if (rows[0]) {
      const comparePassword = hash.compareSync(password, rows[0].password);
      if (!comparePassword) {
        return failureResponse(res, 400, 'Password do not match');
      }
      const tokenData = {
        id: rows[0].id, firstname: rows[0].firstname, lastname: rows[0].lastname, email: rows[0].email,
      };
      const token = tokenGenerator(tokenData);
      const data = {
        token, id: rows[0].id, firstname: rows[0].firstname, lastname: rows[0].lastname, email: rows[0].email,
      };
      return res.status(200).json({
        status: 200,
        message: 'User logged in successfully!',
        data,
      });
    }
    return failureResponse(res, 404, 'User not found');
  }
}


export default userController;
