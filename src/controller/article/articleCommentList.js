/**
 * Import
 */
const {
    INTERNAL_SERVER_ERROR,
} = require('../../../src/constant/errorMessages');
const {
    findArticleCommentList,
} = require('../../../src/services/articleCommentDetailsServices');

/**
 * Article comment list main function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const articleCommentList = async (req, res, next) => {

    try {

        const {
            id
        } = req.params;

        /**
         * Article comment data insert
         */
        const articleComments = await getArticleCommentListData(id);

        /**
         * API response send
         */
        res.send({
            data: {
                articleComments,
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
 * Article comment list data
 */
const getArticleCommentListData = async (id) => {

    const articleCommentDetails = await findArticleCommentList(id);

    if (articleCommentDetails.error)
        throw new Error(INTERNAL_SERVER_ERROR);

    return articleCommentDetails.data;

};

/**
 * Export function
 */
exports.get = articleCommentList;