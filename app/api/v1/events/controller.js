const { StatusCodes } = require('http-status-codes');
const { 
    getAllEvents,
    getOneEvent,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../../../services/mongoose/events')

const find = async (req, res, next) => {
    try {
        const data = await getAllEvents(req);
        res.status(StatusCodes.OK).json({ data, });
    } catch (error) {
        next(error)
    }
}

const index = async (req, res, next) => {
    try {
        const data = await getOneEvent(req);
        res.status(StatusCodes.OK).json({ data, });
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const data = await createEvent(req)
        res.status(StatusCodes.CREATED).json({
            data,
        });
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const update = await updateEvent(req)

        res.status(StatusCodes.OK).json({ data: update })
    } catch (error) {
        next(error);
    }
}

const destroy = async (req, res, next) => {
    try {
        const data = await deleteEvent(req);
        res.status(StatusCodes.OK).json({ message: 'Event deleted successfully', data })
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