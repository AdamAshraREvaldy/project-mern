const { StatusCodes } = require('http-status-codes');
const { 
    createTalent,
    getAllTalents,
    getOneTalent,
    updateTalent,
    deleteTalent,
    checkingTalent,
} = require('../../../services/mongoose/talents')

const find = async (req, res, next) => {
    try {
        const data = await getAllTalents(req);
        res.status(StatusCodes.OK).json({ data, });
    } catch (error) {
        next(error)
    }
}

const index = async (req, res, next) => {
    // const { id } = req.params;
    try {
        const data = await getOneTalent(req);
        res.status(StatusCodes.OK).json({ data, });
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    // const { name, role, image } = req.body;
    try {
        // const createCatagory = await Categories.create({ name });
        const data = await createTalent(req);
        res.status(StatusCodes.CREATED).json({
            data,
        });
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const update = await updateTalent(req)

        res.status(StatusCodes.OK).json({ data: update })
    } catch (error) {
        next(error);
    }
}

const destroy = async (req, res, next) => {
    // const { id } = req.params;

    try {
        // const data = await Categories.findByIdAndDelete(id);
        const data = await deleteTalent(req);

        // if (!data) return res.status(400).json({ msg: 'Category not found' });

        res.status(StatusCodes.OK).json({ message: 'Talent deleted successfully', data })
    } catch (error) {
        next(error)
    }
}

const checkTalent = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await checkingTalent(id);
        res.status(StatusCodes.OK).json({ data, });
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
    checkTalent,
}