const Talents = require('../../api/v1/talents/model');
const { BadRequestError, NotFoundError } = require('../../errors/');
const { checkingImage } = require('./images');

// const createTalent = async ({ name, role, image }) => {

//     await checkingImage(image);

//     const check = await Talents.findOne({ name });

//     if (check) throw new BadRequestError("Pembicara telah terdaftar");

//     const result = await Talents.create({ name, role, image });
//     return result
// }
const createTalent = async (req) => {
    const { name, role, image } = req.body;
    const organizer = req.user.organizer 

    await checkingImage(image);

    const check = await Talents.findOne({ name, organizer });

    if (check) throw new BadRequestError("Pembicara telah terdaftar");

    const result = await Talents.create({ name, role, image, organizer });
    return result
}

const getAllTalents = async (req) => {
    const { keyword } = req.query;
    const organizer = req.user.organizer 
    let condition = { organizer };
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

const getOneTalent = async (req) => {
    const { id } = req.params;
    const organizer = req.user.organizer;
    const result = await Talents.findOne({ _id: id, organizer})
        .populate({
            path: 'image',
            select: '_id urlImage organizer ',
        })
        .select('_id name role image organizer');
    if (!result) throw new NotFoundError(`Pembicara tidak ditemukan dengan id: ${id}`);
    
    return result;
}

const updateTalent = async (req) => {
    const { id } = req.params;
    const { name, role, image } = req.body;
    const organizer = req.user.organizer;

    const checkTalent = await Talents.findOne({ _id: id, organizer });
    if (!checkTalent) throw new NotFoundError(`Pembicara tidak ditemukan dengan id: ${id}`);

    // cek duplikat nama di organizer yang sama, kecuali talent ini sendiri
    const check = await Talents.findOne({
        name,
        organizer,
        _id: { $ne: id }
    });
    if (check) throw new BadRequestError('Nama Pembicara duplikat');

    // update hanya jika _id + organizer cocok
    const result = await Talents.findOneAndUpdate(
        { _id: id, organizer },
        { name, role, image },
        { new: true, runValidators: true }
    );

    return result;
};


const deleteTalent = async (req) => {
    const { id } = req.params;
    const organizer = req.user.organizer 
    const result = await Talents.findOneAndDelete({
        _id: id,
        organizer,
    });
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