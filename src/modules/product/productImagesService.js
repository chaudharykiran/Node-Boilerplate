import ProductImages from '../../models/productImages';

/**
 *
 * @param {Binary} location
 * @param {Object} product
 */
export function createProductImage(location, product) {
  const productId = product.id;

  return new ProductImages({
    image_path: location,
    product_id: productId
  }).save();
}
