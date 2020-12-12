
exports.up = function(knex) {
    return knex.schema.createTable('article', function (table) {
        table.increments('id').primary();
        table.string('nickname', 100).notNullable();
        table.string('title', 100).notNullable();
        table.text('content').notNullable();
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('article');
};
