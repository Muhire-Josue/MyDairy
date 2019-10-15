/* eslint-disable max-len */
import hash from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/users';
import userSchema from '../validations/userValidation';
import helperFunction from '../helpers/helperFunction';

dotenv.config();

class userController {
  static entryMessage(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'welcome to MyDiary application',
    });
  }

  static createAccount(req, res) {
    const user = req.body;
    user.id = User.length + 1;
    user.password = hash.hashSync(user.password);
    const token = jwt.sign({
      id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email,
    }, process.env.API_SERCRET_KEY);
    const validateUser = userSchema.validate({
      id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, password: req.body.password,
    });
    if (validateUser.error) {
      return res.status(400).json({ status: 400, error: validateUser.error.details[0].message });
    }
    const duplicatedUser = helperFunction.findByEmail(user.email);
    if (duplicatedUser) {
      return res.status(409).json({
        status: 409,
        error: 'Email already exists',
      });
    }
    User.push(user);

    const data = {
      token, id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email,
    };
    return res.status(201).json({
      status: 201,
      message: 'User created successfully!',
      data,
    });
  }

  static Login(req, res) {
    const { email, password } = req.body;
    const user = helperFunction.findByEmail(email);
    if (user) {
      const comparePassword = hash.compareSync(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({
          status: 400,
          error: 'Password do not match',
        });
      }
      const token = jwt.sign({ firstname: user.firstname, lastname: user.lastname, email: user.email }, process.env.API_SERCRET_KEY);
      const data = {
        token, id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email,
      };
      return res.status(200).json({
        status: 200,
        message: 'User logged in successfully!',
        data,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User not found',
    });
  }
}


export default userController;
