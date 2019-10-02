import User from '../models/users';

export default function findByEmail(email) {
  return User.find(u => u.email === email);
}
