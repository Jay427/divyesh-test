/**
 * Import
 */
const {
    INTERNAL_SERVER_ERROR,
} = require('../../../src/constant/errorMessages');
const {
    insertArticle,
} = require('../../../src/services/articleServices');
const {
    articleCreateValidationSchema,
} = require('../../../src/joiSchema');

/**
 * Article create main function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const articleCreate = async (req, res, next) => {

    try {

        /**
         * Validate body
         */
        await validate(req.body);

        /**
         * Article data insert in database
         */
        await articleDataInsert(req.body);

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

    const validateData = articleCreateValidationSchema.validate(body);

    if (validateData.error && validateData.error !== null)
        throw new Error(validateData.error.message);

};

/**
 * Article data insert in database
 */
const articleDataInsert = async (body) => {

    const articleData = await insertArticle(body);

    if (articleData.error)
        throw new Error(INTERNAL_SERVER_ERROR);

    return articleData.data;

};

/**
 * Export function
 */
exports.post = articleCreate;