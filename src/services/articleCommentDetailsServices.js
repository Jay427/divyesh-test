/**
 * Import
 */
const knex = require('../../src/include/sqlConnection');
const tableName = 'article_comment_details';
const {
    groupBy,
} = require('lodash');

/**
 * Insert article comment details
 */
exports.insertArticleCommentDetails = async (articleCommentDetailsData) => {

    const container = {
        error: null,
        data: null
    };

    try {

        const articleCommentDetails = await knex.insert(articleCommentDetailsData).into(tableName);

        container.data = articleCommentDetails;

        return (container);

    } catch (error) {

        container.error = error;

        return (container);

    }

};

/**
 * Find article common details
 */
exports.findArticleCommonDetails = async (query, fields = []) => {

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
 * Find article comment list
 */
exports.findArticleCommentList = async (articleId) => {

    const container = {
        error: null,
        data: null
    };

    try {

        const commentQuery = {
            article_id: articleId,
            parent_comment_id: null
        };

        const comments = await knex(tableName)
            .where(commentQuery)
            .innerJoin('comment', 'comment.id', 'article_comment_details.comment_id')
            .select(['id', 'nickname', 'content', 'createdAt']);


        if (comments.length) {

            let groupCommentReply = {};
            const commentReplyQuery = {
                article_id: articleId,
            };

            const commentReply = await knex(tableName)
                .where(commentReplyQuery)
                .whereNot({
                    parent_comment_id: null
                })
                .innerJoin('comment', 'comment.id', 'article_comment_details.comment_id')
                .select(['id', 'nickname', 'content', 'createdAt', 'parent_comment_id']);

            if (commentReply.length) {

                groupCommentReply = groupBy(commentReply, 'parent_comment_id');

            }

            comments.map((item) => {

                item.replies = [];

                if (groupCommentReply[item.id]) {

                    item.replies = groupCommentReply[item.id];

                }

            });

        }

        container.data = comments;

        return (container);

    } catch (error) {

        container.error = error;

        return (container);

    }

};