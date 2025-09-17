const Images = require('../../api/v1/images/model');
const { BadRequestError, NotFoundError } = require('../../errors/');

const createImage = async (req) => {
    const urlImage = req.file 
    ? `uploads/${req.file.filename}`
    : 'uploads/avatar/default.jpeg';
    const organizer = req.user.organizer;
    const result = await Images.create({ urlImage, organizer });

    return result;
}

const checkingImage = async (id) => {
    const result = Images.findOne({ _id: id });

    if (!result) throw new NotFoundError(`Tidak ada gambar dengan id ${id}`);
    return result;
}

module.exports = { 
    createImage,
    checkingImage,
}