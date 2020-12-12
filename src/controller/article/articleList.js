/**
 * Import
 */
const {
    INTERNAL_SERVER_ERROR,
} = require('../../../src/constant/errorMessages');
const {
    listArticle,
} = require('../../../src/services/articleServices');

/**
 * Article list main function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const articleList = async (req, res, next) => {

    try {

        const {
            page = 1,
                pageSize = 20,
        } = req.query;

        /**
         * Article data insert in database
         */
        const articles = await getArticleList(page, pageSize);

        /**
         * API response send
         */
        res.send({
            data: {
                articles,
            },
        });

    } catch (error) {

        /**
         * Error send in error handler middleware
         */
        return next(error);

    }

};

/**
 * Get article list
 */
const getArticleList = async (page, pageSize) => {

    const limit = pageSize;
    const offset = (parseInt(limit) * (parseInt(page) - 1));

    const articleList = await listArticle({}, offset, limit);

    if (articleList.error)
        throw new Error(INTERNAL_SERVER_ERROR);

    return articleList.data;

};

/**
 * Export function
 */
exports.get = articleList;