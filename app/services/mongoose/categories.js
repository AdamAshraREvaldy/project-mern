const Categories = require('../../api/v1/categories/model');
const { BadRequestError, NotFoundError } = require('../../errors/');

const getAllCategories = async (req) => {
    const results = await Categories.find({ organizer: req.user.organizer});

    return results;
}

const getOneCategory = async (req) => {
    const { id } = req.params;
    const organizer  = req.user.organizer
    const result = await Categories.findOne({ organizer, _id: id});
    if (!result) throw new NotFoundError(`Kategori tidak ditemukan dengan id: ${id}`);

    return result;
}

const createCategory = async (req) => {
    const { name } = req.body;
    const check = await Categories.findOne({ name, organizer: req.user.organizer });
    if (check) throw new BadRequestError('kategori nama duplikat');

    const result = await Categories.create({ name, organizer: req.user.organizer });

    return result;
}

const updateCategory = async(req) => {
    const { id } = req.params
    const { name } = req.body;
    const organizer = req.user.organizer

    // check id kategori apakah ada di organizer yang login
    const checkCategory = await Categories.findOne({ _id: id, organizer });
    if (!checkCategory) throw new NotFoundError(`Category tidak ditemukan dengan id: ${id}`);

    // check update kategori organizer login tidak boleh sama
    const check = await Categories.findOne({ name, organizer, _id: { $ne: id } });
    if (check) throw new BadRequestError('kategori nama duplikat');
    
    const result = await Categories.findByIdAndUpdate(
        { _id: id, organizer }, 
        { name },               
        { new: true, runValidators: true }
    );

    return result;
}

const deleteCategory = async (req) => {
    const { id } = req.params;
    const organizer  = req.user.organizer
    const result = await Categories.findOneAndDelete({
        _id: id,
        organizer,
    });

    if (!result) throw new NotFoundError(`Kategori tidak ditemukan dengan id: ${id}`);

    return result;
}

const checkingCategory = async (id) => {
    const result = await Categories.findOne({ _id: id });
    if (!result) throw new NotFoundError(`Kategori tidak ditemukan dengan id: ${id}`);
    
    return result;
}

module.exports = {
    getAllCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    checkingCategory,
}