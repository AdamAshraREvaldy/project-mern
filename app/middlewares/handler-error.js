const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default
        StatusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'something went wrong try again later',
    };
    // error validation dari mongoose
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map( item => item.message ).join(', ');
        customError.StatusCode = 400;
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicated value entered for ${Object.keys(
            err.keyValue
        )} Field, please choose another value`;
        customError.StatusCode = 400;
    }

    if (err.name === 'CastError') {
        customError.msg = `No item found with id: ${err.value}`;
        customError.StatusCode = 404;
    }

    return res.status(customError.StatusCode).json({ msg: customError.msg });
}

module.exports = errorHandlerMiddleware;