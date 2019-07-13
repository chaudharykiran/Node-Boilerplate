const TABLE_NAME = 'product_images';

/**
 * Create table `product_images`.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();
    table.string('image_path').notNull();
    table.integer('product_id').references('products.id');
  });
}

/**
 * Drop table `product_images`.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(TABLE_NAME);
}
