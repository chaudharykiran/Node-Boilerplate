/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.table('products', function(t) {
    t.string('description').notNull();
    t.integer('quantity').notNull();
    t.integer('price').notNull();
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.table('products', function(table) {
    table.dropColumn('description');
    table.dropColumn('quanity');
    table.dropColumn('price');
  });
}
