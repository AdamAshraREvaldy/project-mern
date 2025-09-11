const { StatusCodes } = require('http-status-codes');
const { createImage } = require('../../../services/mongoose/images')

const create = async (req, res, next) => {
    const urlImage = req.file 
        ? `uploads/${req.file.filename}`
        : 'uploads/avatar/default.jpeg';
    try {
        console.log('req.file');
        console.log(req.file);
        const data = await createImage({ urlImage })
        res.status(StatusCodes.CREATED).json({
            data,
        });
    } catch (error) {
        next(error)
    }
}

module.exports = { create }