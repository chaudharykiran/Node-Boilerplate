import Joi from 'joi';
import validate from '../../utils/validate';

const SCHEMA = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function userValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(error => next(error));
}
