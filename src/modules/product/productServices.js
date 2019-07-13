import Product from '../../models/product';
import Boom from 'boom';

/**
 * Get all product.
 *
 * @returns {Promise}
 */
export function getAllProduct() {
  return Product.fetchAll();
}

/**
 *
 * @param {Number} limit
 * @param {Number} offSet
 *
 * @returns {Promise}
 */
export async function getPaginatedProducts(limit, offSet) {
  const totalProducts = await Product.count();
  const products = await Product.query(qb => {
    qb.offset(offSet).limit(limit);
  }).fetchAll({ withRelated: ['productImages'] });

  return {
    total: totalProducts,
    products
  };
}

/**
 * Get a product.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getProduct(id) {
  return Product.forge({ id })
    .fetch({ withRelated: ['productImages'] })
    .then(product => {
      if (!product) {
        throw Boom.notFound('Product not found');
      }

      return product;
    });
}

/**
 * Create new product.
 *
 * @param   {Object}  product
 * @returns {Promise}
 */
export function createProduct(product) {
  return new Product({
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity
  }).save();
}

/**
 * Update a product.
 *
 * @param   {Number|String}  id
 * @param   {Object}         product
 * @returns {Promise}
 */
export function updateProduct(id, product) {
  return new Product({ id })
    .save({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity
    })
    .save();
}

/**
 * Delete a product.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteProduct(id) {
  return new Product({ id }).fetch().then(product => product.destroy());
}
