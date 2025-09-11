const { StatusCodes } = require('http-status-codes');
const { createUserOrganizer, createUser } = require('../../../services/mongoose/users')


const create = async (req, res, next) => {
    try {
        const data = await createUserOrganizer(req)
        res.status(StatusCodes.CREATED).json({
            data,
        });
    } catch (error) {
        next(error)
    }
}

const createAdmin = async (req, res, next) => {
    try {
        const data = await createUser(req)
        res.status(StatusCodes.CREATED).json({
            data,
        });
    } catch (error) {
        next(error)
    }
}





module.exports = {
    create,
    createAdmin,
}