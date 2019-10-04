import User from '../models/users';
import Entry from '../models/entries';

class helperFunction {
  static findByEmail(email) {
    return User.find(u => u.email === email);
  }

  static findById(id) {
    return Entry.find(e => e.id === id);
  }

  static findEntryIndex(id) {
    return Entry.findIndex(e => e.id === id);
  }
}

export default helperFunction;
