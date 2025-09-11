const Categories = require('../../api/v1/categories/model');
const { BadRequestError, NotFoundError } = require('../../errors/');

const getAllCategories = async (organizer) => {
    const results = await Categories.find({ organizer });

    return results;
}

const getOneCategory = async (id, organizer) => {
    const result = await Categories.findOne({ organizer, _id: id});
    if (!result) throw new NotFoundError(`Kategori tidak ditemukan dengan id: ${id}`);

    return result;
}

const createCategory = async ({ name, organizer }) => {
    const check = await Categories.findOne({ name });
    if (check) throw new BadRequestError('kategori nama duplikat');

    const result = await Categories.create({ name, organizer });

    return result;
}

const updateCategory = async( organizer, id, { name }) => {
    // const check = await Categories.findOne({ name });
    const check = await Categories.findOne({ name, organizer, _id: { $ne: id } });
    if (check) throw new BadRequestError('kategori nama duplikat');    

    const result = await Categories.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true }
    );

    if (!result) throw new NotFoundError(`Kategori tidak ditemukan dengan id: ${id}`);

    return result;
}

const deleteCategory = async (organizer, id) => {
    const result = await Categories.findByIdAndDelete(organizer, id);
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