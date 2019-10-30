/* eslint-disable no-param-reassign */
/* eslint-disable radix */
import User from '../models/users';
import Entry from '../models/entries';

class helperFunction {
  /**
   *@description Finds a user using the email
   * @param {string} email
   * @returns {object}
   */
  static findByEmail(email) {
    return User.find(u => u.email === email);
  }

  /**
   *@description Finds an entry using the id
   * @param {string} id
   * @returns {object}
   */
  static findById(id) {
    return Entry.find(e => e.id === id);
  }

  /**
   *@description Finds the index of an entry using the id
   * @param {string} id
   * @returns {number}
   */
  static findEntryIndex(id) {
    return Entry.findIndex(e => e.id === id);
  }

  /**
   *@description Finds and delete an entry
   * @param {string} id
   * @returns {Array}
   */

  static deleteEntryById(id) {
    const entry = helperFunction.findById(id);
    const entryIndex = Entry.indexOf(entry);
    return Entry.splice(entryIndex, 1);
  }
}

export default helperFunction;
