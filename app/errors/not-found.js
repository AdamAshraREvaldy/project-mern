// import http-status-code
const { StatusCodes } = require('http-status-codes');
// import class custom-api
const CustomAPIError = require('./custom-api-error');

class NotFound extends CustomAPIError {
    constructor(message) {
        super(message);
        // kasih status code bad req
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFound;