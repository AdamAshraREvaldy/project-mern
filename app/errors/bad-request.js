// import http-status-code
const { StatusCodes } = require('http-status-codes');
// import class custom-api
const CustomAPIError = require('./custom-api-error');

class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message);
        // kasih status code bad req
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequest;