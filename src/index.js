/**
 * Import module
 */
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const cors = require("cors");
const config = require('../config');
const logger = require('./helpers/logger');

/**
 * Set cors middleware
 */
app.use(cors());

/**
 * Set morgan middleware
 */
app.use(morgan('dev'));

/**
 * Set middleware that only parses json
 */
app.use(bodyParser.json({
    limit: '50mb',
}));

/**
 * Set middleware for final response 
 */
app.use(require('./middleware/responseFormat'));

/**
 * API routes
 */
app.use(require('./routes'));

/**
 * Set middleware for error response 
 */
app.use(require('./middleware/errorHandler'));

/**
 * Server listen
 */
if (config.env != 'test') {

    server.listen(config.port, () => {

        logger.info(`Server :: Start :: Port :: ${config.port}`);

    });

}

/**
 * Module exports
 */
module.exports = app;