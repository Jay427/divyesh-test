/**
 * API not found middleware
 */
const {
    API_NOT_FOUND
} = require('../constant/errorMessages');

const notFound = function (req, res, next) {

    const [code, message] = API_NOT_FOUND.split("::");

    const apiErrorResponse = {
        error: true,
        message: message || '',
        data: {},
    };

    res.status(code).send(apiErrorResponse);

};

module.exports = notFound;