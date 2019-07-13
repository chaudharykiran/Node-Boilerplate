import bookshelf from '../db';
import ProductImages from './productImages';

const TABLE_NAME = 'products';

/**
 * User model.
 */
class Product extends bookshelf.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }

  /**
   * One Product will have many product images.
   */
  productImages() {
    return this.hasMany(ProductImages);
  }
}

export default Product;
