const { StatusCodes } = require('http-status-codes');
const { 
    getAllPayments, getOnePayment, createPayment, 
    updatePayment, deletePayment } 
= require('../../../services/mongoose/payments');

const find = async (req, res, next) => {
    try {
        const data = await getAllPayments(req);
        res.status(StatusCodes.OK).json({ data, });
    } catch (error) {
        next(error)
    }
}

const index = async (req, res, next) => {
    try {
        const data = await getOnePayment(req);
        res.status(StatusCodes.OK).json({ data, });
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {

    try {
        const data = await createPayment(req);
        res.status(StatusCodes.CREATED).json({
            data,
        });
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const update = await updatePayment(req)

        res.status(StatusCodes.OK).json({ data: update })
    } catch (error) {
        next(error);
    }
}

const destroy = async (req, res, next) => {
    try {
        const data = await deletePayment(req);

        res.status(StatusCodes.OK).json({ message: 'Payment deleted successfully', data })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    find,
    index,
    update,
    destroy,
}
