import Boom from 'boom';
import bcrypt from 'bcrypt';

import User from '../models/user';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getUser(id) {
  return new User({ id }).fetch().then(user => {
    if (!user) {
      throw Boom.notFound('User not found');
    }

    return user;
  });
}

/**
 * Create new user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
export function createUser(user) {
  const hashedPassword = bcrypt.hashSync(user.password, 10);

  return new User({
    email: user.email,
    password: hashedPassword
  }).save();
}

/**
 * Update a user.
 *
 * @param   {Number|String}  id
 * @param   {Object}         user
 * @returns {Promise}
 */
export function updateUser(id, user) {
  return new User({ id }).save({ name: user.name });
}

/**
 * Delete a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}

/**
 *
 * @param {String} email
 */
export function getUserByEmail(email) {
  return new User({ email }).fetch().then(user => {
    return user;
  });
}
