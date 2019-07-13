import HttpStatus from 'http-status-codes';
import Boom from 'boom';
import omit from 'lodash/omit';
import bcrypt from 'bcrypt';

import { createToken } from '../../utils/tokenGenerator';

import * as userService from '../../services/userService';

/**
 * Crate a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function createUser(req, res, next) {
  try {
    const user = await userService.getUserByEmail(req.body.email);

    if (user) {
      throw Boom.notAcceptable('Email Already Exist');
    }

    await userService
      .createUser(req.body)
      .then(user => user.toJSON())
      .then(user => omit(user, ['password'])) // filter password
      .then(user => {
        const token = createToken(user, process.env.SECRET);

        res.status(HttpStatus.CREATED).json({
          data: { ...user, token }
        });
      })
      .catch(err => next(err));
  } catch (error) {
    next(error);
  }
}

/**
 * Verify if email already exist.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function checkMail(req, res, next) {
  try {
    const user = await userService.getUserByEmail(req.body.email);

    if (user) {
      throw Boom.notAcceptable('Email Already Exist');
    }

    res.status(HttpStatus.OK).json({
      canRegister: true
    });
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function loginUser(req, res, next) {
  try {
    let user = await userService.getUserByEmail(req.body.email);

    user = user.toJSON();
    if (!user) {
      throw Boom.unauthorized('User does not exits');
    }

    // if user is availabe then compare password
    // and generate toke for user
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Email or Password is incorrect'
      });
    }

    const token = createToken(user, process.env.SECRET);

    return res.status(HttpStatus.OK).json({
      id: user.id,
      email: user.email,
      token: token
    });
  } catch (error) {
    next(error);
  }
}
