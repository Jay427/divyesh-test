/**
 * Import
 */
const knex = require('../../src/include/sqlConnection');
const tableName = 'comment';

/**
 * Insert comment
 */
exports.insertComment = async (commentData) => {

    const container = {
        error: null,
        data: null
    };

    try {

        const comment = await knex.insert(commentData).into(tableName);

        container.data = comment;

        return (container);

    } catch (error) {

        container.error = error;

        return (container);

    }

};

/**
 * Find comment
 */
exports.findComment = async (query, fields = []) => {

    const container = {
        error: null,
        data: null
    };

    try {

        const comment = await knex(tableName).where(query).select(fields);

        container.data = comment;

        return (container);

    } catch (error) {

        container.error = error;

        return (container);

    }

};