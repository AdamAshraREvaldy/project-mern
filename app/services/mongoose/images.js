const Images = require('../../api/v1/images/model');
const { BadRequestError, NotFoundError } = require('../../errors/');

const createImage = async ({ urlImage }) => {
    const result = await Images.create({ urlImage });

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