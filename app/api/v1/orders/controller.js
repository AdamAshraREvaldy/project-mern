const { StatusCodes } = require('http-status-codes');
const { getAllOrders } = require('../../../services/mongoose/orders');

const index = async (req, res, next) => {
    try {
        const data = await getAllOrders(req);
        res.status(StatusCodes.OK).json({ data, });
    } catch (error) {
        next(error)
    }
};

module.exports = { index, }