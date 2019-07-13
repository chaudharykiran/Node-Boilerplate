import jwt from 'jsonwebtoken';
import { pick } from 'lodash';

/**
 * JWT token generator.
 *
 * @param {Object} user
 * @param {String} secret
 */
export const createToken = (user, secret) => {
  const createToken = jwt.sign(
    {
      user: pick(user, ['id'])
    },
    secret,
    {
      expiresIn: '24h'
    }
  );

  return createToken;
};
