import Joi from 'joi';
import validate from '../../utils/validate';

const SCHEMA = {
  name: Joi.string()
    .label('Name')
    .max(90)
    .required()
};

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function productValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}



export {productValidator };
