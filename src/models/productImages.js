import bookshelf from '../db';
import Product from './product';

const TABLE_NAME = 'product_images';

/**
 * Product Images model
 */
class ProductImages extends bookshelf.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * One Product will be parent of every product images.
   */
  product() {
    return this.belongsTo(Product);
  }
}

export default ProductImages;
