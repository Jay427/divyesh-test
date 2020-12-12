/**
 * All API route declare with controller
 */
const express = require('express');
const router = express.Router();
const {
	forEach,
} = require('lodash');
const controller = require('../../src/controller');
const notFound = require('../../src/middleware/notFound');

/**
 * Routes declaration
 * [apiUrl, apiController, apiValidation]
 */
const routes = [
	/**
	 * Article API
	 */
	['/api/v1/article/:id/comment/list', controller.article.articleCommentList],
	['/api/v1/article/:id/comment', controller.article.articleComment],
	['/api/v1/article/:id/content', controller.article.articleContent],
	['/api/v1/article/create', controller.article.articleCreate],
	['/api/v1/article/list', controller.article.articleList],
];

forEach(routes, function (route) {

	let middleware = function (req, res, next) {
		next();
	};

	const path = route[0];
	const destination = route[1];
	const verify = route[2] || false;

	if (destination.get) {
		method = 'get';
	} else if (destination.post) {
		method = 'post';
	} else if (destination.put) {
		method = 'put';
	} else if (destination.delete) {
		method = 'delete';
	}

	if (method != '' && path && middleware) {

		router[method](path, middleware, destination[method] || notFound);

	}

});

/**
 * Exports router
 */
module.exports = router;