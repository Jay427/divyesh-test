/**
 * Import
 */
const knex = require('../../src/include/sqlConnection');
const tableName = 'article';

/**
 * Insert article
 */
exports.insertArticle = async (articleData) => {

    const container = {
        error: null,
        data: null
    };

    try {

        const article = await knex.insert(articleData).into(tableName);

        container.data = article;

        return (container);

    } catch (error) {

        container.error = error;

        return (container);

    }

};

/**
 * Find article
 */
exports.findArticle = async (query, fields = []) => {

    const container = {
        error: null,
        data: null
    };

    try {

        const article = await knex(tableName).where(query).select(fields);

        container.data = article;

        return (container);

    } catch (error) {

        container.error = error;

        return (container);

    }

};

/**
 * List article
 */
exports.listArticle = async (query, offset, limit, fields = []) => {

    const container = {
        error: null,
        data: null
    };

    try {

        const article = await knex(tableName).where(query).orderBy('createdAt', 'desc').offset(offset).limit(limit).select(fields);

        container.data = article;

        return (container);

    } catch (error) {

        container.error = error;

        return (container);

    }

};