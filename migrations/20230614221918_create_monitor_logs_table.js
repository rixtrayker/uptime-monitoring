exports.up = function (knex) {
  return knex.schema.createTable('url_monitor_logs', function (table) {
    table.increments('id').primary();
    table.integer('url_id').unsigned();
    table.foreign('url_id').references('id').inTable('urls');
    table.enu('status', ['up', 'down']).notNullable();
    table.integer('response_time').nullable().comment('Time in milliseconds');
    table.timestamp('timestamp').defaultTo(knex.fn.now());
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('url_monitor_logs');
};
