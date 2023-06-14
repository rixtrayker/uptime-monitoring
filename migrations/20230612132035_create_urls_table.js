exports.up = function(knex) {
  return knex.schema.createTable('urls', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('url').notNullable();
    table.enu('protocol', ['HTTP', 'HTTPS', 'TCP']).notNullable();
    table.string('path').nullable();
    table.integer('port').nullable();
    table.string('webhook').nullable();
    table.integer('timeout').nullable().defaultTo(5);
    table.integer('interval').nullable().defaultTo(10);
    table.integer('threshold').nullable().defaultTo(1);
    table.jsonb('authentication').nullable();
    table.jsonb('http_headers').nullable();
    table.jsonb('assert').nullable();
    table.specificType('tags', 'varchar(255)[]').nullable();
    table.boolean('ignore_ssl').nullable().defaultTo(false);
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('urls');
};