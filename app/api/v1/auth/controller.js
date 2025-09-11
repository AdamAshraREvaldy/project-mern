const { StatusCodes } = require('http-status-codes');
const { signin } = require('../../../services/mongoose/auth');

const signinCms = async (req, res, next) => {
    try {
        const token = await signin(req);
        res.status(StatusCodes.CREATED).json({
            token,
        });
    } catch (error) {
        next(error)
    }
};

module.exports = { signinCms }