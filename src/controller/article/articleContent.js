/**
 * Import
 */
const {
    INTERNAL_SERVER_ERROR,
    ARTICLE_NOT_FOUND_ERROR,
} = require('../../../src/constant/errorMessages');
const {
    findArticle,
} = require('../../../src/services/articleServices');

/**
 * Article content main function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const articleContent = async (req, res, next) => {

    try {

        /**
         * Get article data
         */
        const article = await getArticleData(req.params.id);

        /**
         * API response send
         */
        res.send({
            data: {
                article,
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
 * Get article data
 */
const getArticleData = async (id) => {

    const articleData = await findArticle({
        id,
    });

    if (articleData.error)
        throw new Error(INTERNAL_SERVER_ERROR);

    if (!articleData.data.length)
        throw new Error(ARTICLE_NOT_FOUND_ERROR);

    return articleData.data[0];

};

/**
 * Export function
 */
exports.get = articleContent;