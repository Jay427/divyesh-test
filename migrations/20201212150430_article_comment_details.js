
exports.up = function(knex) {
    return knex.schema.createTable('article_comment_details', function (table) {
        table.integer('article_id').notNullable();
        table.integer('comment_id').notNullable();
        table.integer('parent_comment_id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('article_comment_details');
};
