/* eslint-disable no-param-reassign */
/* eslint-disable radix */
import User from '../models/users';

class helperFunction {
  /**
   *@description Finds a user using the email
   * @param {string} email
   * @returns {object}
   */
  static findByEmail(email) {
    return User.find(u => u.email === email);
  }
}

export default helperFunction;
