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

  static deleteEntryById(id) {
    const entry = helperFunction.findById(id);
    const entryIndex = Entry.indexOf(entry);
    return Entry.splice(entryIndex, 1);
  }
}

export default helperFunction;
