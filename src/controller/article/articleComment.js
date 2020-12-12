/**
 * Import
 */
const {
    INTERNAL_SERVER_ERROR,
    ARTICLE_NOT_FOUND_ERROR,
} = require('../../../src/constant/errorMessages');
const {
    articleCommentValidationSchema,
} = require('../../../src/joiSchema');
const {
    findArticle,
} = require('../../../src/services/articleServices');
const {
    insertComment,
    findComment,
} = require('../../../src/services/commentServices');
const {
    insertArticleCommentDetails,
    findArticleCommonDetails,
} = require('../../../src/services/articleCommentDetailsServices');

/**
 * Article comment main function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const articleComment = async (req, res, next) => {

    try {

        const {
            id
        } = req.params;

        /**
         * Validate body
         */
        await validate(req.body);

        /**
         * Validate article id
         */
        await validateArticleId(id);

        /**
         * Article comment data insert
         */
        await articleCommentDataInsert(id, req.body);

        /**
         * API response send
         */
        res.send({});

    } catch (error) {

        /**
         * Error send in error handler middleware
         */
        return next(error);

    }

};

/**
 * Validate body fields using Joi validation
 */
const validate = async (body) => {

    const validateData = articleCommentValidationSchema.validate(body);

    if (validateData.error && validateData.error !== null)
        throw new Error(validateData.error.message);

};

/**
 * Validate article id
 */
const validateArticleId = async (id) => {

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
 * Article comment data insert
 */
const articleCommentDataInsert = async (id, body) => {

    const commentObj = {
        nickname: body.nickname,
        content: body.content,
    };

    const commentData = await insertComment(commentObj);

    if (commentData.error)
        throw new Error(INTERNAL_SERVER_ERROR);

    const articleCommentDetailsObj = {
        article_id: id,
        comment_id: commentData.data[0],
    };

    if (body.parentCommentId) {

        const parenComment = await findArticleCommonDetails({
            comment_id: body.parentCommentId,
            parent_comment_id: null,
        });

        if (parenComment.error)
            throw new Error(INTERNAL_SERVER_ERROR);

        if (!parenComment.data.length)
            throw new Error(INTERNAL_SERVER_ERROR);

        articleCommentDetailsObj.parent_comment_id = body.parentCommentId;

    }

    const articleCommentDetails = await insertArticleCommentDetails(articleCommentDetailsObj);

    if (articleCommentDetails.error)
        throw new Error(INTERNAL_SERVER_ERROR);

    return articleCommentDetails.data;

};

/**
 * Export function
 */
exports.post = articleComment;