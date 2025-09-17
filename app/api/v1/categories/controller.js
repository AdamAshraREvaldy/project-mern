const { StatusCodes } = require('http-status-codes');
const { 
    getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory, checkingCategory
} = require('../../../services/mongoose/categories');



const findCategory = async (req, res, next) => {
    try {
        const data = await getAllCategories(req);
        res.status(StatusCodes.OK).json({ data, });
    } catch (error) {
        next(error)
    }
}

const index = async (req, res, next) => {
    try {
        const data = await getOneCategory(req);
        res.status(StatusCodes.OK).json({ data, });
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    // const { name } = req.body;
    try {
        // const createCatagory = await Categories.create({ name });
        const data = await createCategory(req);
        res.status(StatusCodes.CREATED).json({
            data,
        });
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const update = await updateCategory(req)

        res.status(StatusCodes.OK).json({ data: update })
    } catch (error) {
        next(error);
    }
}

const destroy = async (req, res, next) => {
    // const { id } = req.params;
    // const organizer  = req.user.organizer

    try {
        // const data = await Categories.findByIdAndDelete(id);
        const data = await deleteCategory(req);

        // if (!data) return res.status(400).json({ msg: 'Category not found' });

        res.status(StatusCodes.OK).json({ message: 'Category deleted successfully', data })
    } catch (error) {
        next(error)
    }
}

const checkCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await checkingCategory(id);
        return data;
    } catch (error) {
        next(error);
    }
}



module.exports = {
    create,
    findCategory,
    index,
    update,
    destroy,
    checkCategory,
}