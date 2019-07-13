import User from '../../models/user';

/**
 * Get User By Email.
 *
 * @param {String} email
 */
export function getUserByEmail(email) {
  return new User({ email }).fetch().then(user => {
    return user;
  });
}
