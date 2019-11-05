/* eslint-disable max-len */
import hash from 'bcrypt-nodejs';
import dotenv from 'dotenv';
import uuid from 'uuid';
import User from '../models/users';
import userSchema from '../validations/userValidation';
import helperFunction from '../helpers/helperFunction';
import successResponse from '../helpers/successResponse';
import failureResponse from '../helpers/failureResponse';
import tokenGenerator from '../helpers/userTokenGenerator';
import db from '../models/index';

dotenv.config();

class userController {
  /**
   *@description Displays a welcome message
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static entryMessage(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'welcome to MyDiary application',
    });
  }

  /**
   *@description Creates a user account
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */

  static async createAccount(req, res) {
    const user = req.body;
    user.password = hash.hashSync(user.password);
    const {
      firstname, lastname, email, password,
    } = user;
    const validateUser = userSchema.validate({
      firstname: user.firstname, lastname: user.lastname, email: user.email, password: req.body.password,
    });
    if (validateUser.error) {
      return failureResponse(res, 400, validateUser.error.details[0].message);
    }
    const text = `INSERT INTO
    users(id, firstname, lastname, email, password)
    VALUES($1, $2, $3, $4, $5)
    returning id, firstname, lastname, email, password, "createdDate"`;

    const values = [uuid.v1(), firstname, lastname, email, password];
    const checkUser = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    if (checkUser.rows.length > 0) {
      return failureResponse(res, 409, 'Email already exists');
    }

    const { rows } = await db.query(text, values);
    User.push(user);
    const tokenData = {
      id: rows[0].id, firstname: rows[0].firstname, lastname: rows[0].lastname, email: rows[0].email,
    };
    const token = tokenGenerator(tokenData);
    const data = {
      token, id: rows[0].id, firstname: rows[0].firstname, lastname: rows[0].lastname, email: rows[0].email,
    };
    return successResponse(res, 201, 'User created successfully!', data);
  }


  /**
   *@description It logs in the user
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static Login(req, res) {
    const { email, password } = req.body;
    const user = helperFunction.findByEmail(email);
    if (user) {
      const comparePassword = hash.compareSync(password, user.password);
      if (!comparePassword) {
        return failureResponse(res, 400, 'Password do not match');
      }
      const tokenData = {
        id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email,
      };
      const token = tokenGenerator(tokenData);
      const data = {
        token, id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email,
      };
      return successResponse(res, 200, 'User logged in successfully!', data);
    }
    return failureResponse(res, 404, 'User not found');
  }
}


export default userController;
