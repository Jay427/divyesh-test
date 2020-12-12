/**
 * API joi validation
 */
const Joi = require('@hapi/joi');
const errorMessages = require('../../src/constant/errorMessages');

exports.articleCreateValidationSchema = Joi.object().keys({
    nickname: Joi.string().error(new Error(errorMessages.NICK_NAME_ERROR)).required(),
    title: Joi.string().error(new Error(errorMessages.TITLE_ERROR)).required(),
    content: Joi.string().error(new Error(errorMessages.CONTENT_ERROR)).required(),
});

exports.articleCommentValidationSchema = Joi.object().keys({
    nickname: Joi.string().error(new Error(errorMessages.NICK_NAME_ERROR)).required(),
    content: Joi.string().error(new Error(errorMessages.CONTENT_ERROR)).required(),
    parentCommentId: Joi.string().allow("", null).error(new Error(errorMessages.PARENT_COMMENT_ID_ERROR)),
});