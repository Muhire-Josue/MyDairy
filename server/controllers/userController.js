/* eslint-disable max-len */
import hash from 'bcrypt-nodejs';
import dotenv from 'dotenv';
import User from '../models/users';
import userSchema from '../validations/userValidation';
import helperFunction from '../helpers/helperFunction';
import successResponse from '../helpers/successResponse';
import failureResponse from '../helpers/failureResponse';
import tokenGenerator from '../helpers/userTokenGenerator';

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

  static createAccount(req, res) {
    const user = req.body;
    user.id = User.length + 1;
    user.password = hash.hashSync(user.password);
    const tokenData = {
      id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email,
    };
    const token = tokenGenerator(tokenData);
    const validateUser = userSchema.validate({
      id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, password: req.body.password,
    });
    if (validateUser.error) {
      return failureResponse(res, 400, validateUser.error.details[0].message);
    }
    const duplicatedUser = helperFunction.findByEmail(user.email);
    if (duplicatedUser) {
      return failureResponse(res, 409, 'Email already exists');
    }
    User.push(user);

    const data = {
      token, id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email,
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