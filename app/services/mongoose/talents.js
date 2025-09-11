const Talents = require('../../api/v1/talents/model');
const { BadRequestError, NotFoundError } = require('../../errors/');
const { checkingImage } = require('./images');

const createTalent = async ({ name, role, image }) => {

    await checkingImage(image);

    const check = await Talents.findOne({ name });

    if (check) throw new BadRequestError("Pembicara telah terdaftar");

    const result = await Talents.create({ name, role, image });
    return result
}

const getAllTalents = async ({ keyword }) => {
    let condition = {};
    if (keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: 'i' } };
    }

    const result = await Talents.find(condition)
        .populate({
            path: 'image',
            select: '_id urlImage',
        })
        .select('_id name role image');
    return result;
}

const getOneTalent = async (id) => {
    const result = await Talents.findOne({ _id: id})
        .populate({
            path: 'image',
            select: '_id urlImage',
        })
        .select('_id name role image');
    if (!result) throw new NotFoundError(`Pembicara tidak ditemukan dengan id: ${id}`);
    
    return result;
}

const updateTalent = async ( id, { name, role, image }) => {
    
    const check = await Talents.findOne({ name, _id: { $ne: id } });
    if (check) throw new BadRequestError('Nama Pembicara duplikat');   

    const result = await Talents.findByIdAndUpdate(
        id,
        { name, role, image },
        { new: true, runValidators: true }
    );
    
    if (!result) throw new NotFoundError(`Pembicara tidak ditemukan dengan id: ${id}`);
    
    return result;
}

const deleteTalent = async (id) => {
    const result = await Talents.findByIdAndDelete(id);
    if (!result) throw new NotFoundError(`Pembicara tidak ditemukan dengan id: ${id}`);
    
    return result;
}

const checkingTalent = async (id) => {
    const result = await Talents.findOne({ _id: id });
    if (!result) throw new NotFoundError(`Pembicara tidak ditemukan dengan id: ${id}`);
    
    return result;
}

module.exports = {
    createTalent,
    getAllTalents,
    getOneTalent,
    updateTalent,
    deleteTalent,
    checkingTalent,
}