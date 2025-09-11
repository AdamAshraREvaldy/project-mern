const Events = require('../../api/v1/events/model');
const { BadRequestError, NotFoundError } = require('../../errors/');
const { checkingImage } = require('./images');
const { checkingTalent } = require('./talents');
const { checkingCategory } = require('./categories');

const getAllEvents = async (req) => {
    const { keyword, category, talent } = req.query;

    let condition = {}
    if (keyword) {
        condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
    }

    if (category) {
        condition = { ...condition, category: { $regex: category, $options: 'i' } };
    }

    if (talent) {
        condition = { ...condition, talent: { $regex: talent, $options: 'i' } };
    }

    const result = await Events.find(condition)
        .populate({ path: 'image', select: '_id urlImage', })
        .populate({ path: 'category', select: '_id name', })
        .populate(
            { 
                path: 'talent', 
                select: '_id name role image', 
                populate: { path: 'image', select: '_id urlImage'},
            }
    );

    return result;
    
}

const getOneEvent = async (req) => {
    const { id } = req.params;

    const result = await Events.findOne({ _id: id })
        .populate({ path: 'image', select: '_id urlImage', })
        .populate({ path: 'category', select: '_id name', })
        .populate(
            { 
                path: 'talent', 
                select: '_id name role image', 
                populate: { path: 'image', select: '_id urlImage'},
            }
    );

    if (!result) throw new NotFoundError(`Tidak ada Event dengan id: ${id}`);
    return result;
}

const createEvent = async (req) => {
    const { 
        title, date, about, 
        tagline, keyPoint, venueName,
        statusEvent, tickets, image,
        category, talent
     } = req.body;

    //  check image menggunakan id. ada atau tidak
    await checkingImage(image);
    // // check category pada event tsb, menggunakan id. ada atau tidak
    await checkingCategory(category);
    // check talent menggunakan id. ada atau tidak
    await checkingTalent(talent);

    const check = await Events.findOne({ title });
    if (check) throw new BadRequestError("Event sudah terdaftar");

    const result = await Events.create({ title, date, about, 
        tagline, keyPoint, venueName,
        statusEvent, tickets, image,
        category, talent 
    });

    return result;
}

const updateEvent = async (req) => {
    const { id } = req.params;
    const { 
        title, date, about, 
        tagline, keyPoint, venueName,
        statusEvent, tickets, image,
        category, talent
    } = req.body;

    // check event terdaftar atau tidak pada sistem
    const checkEvent = await Events.findOne({ _id: id });
    if (!checkEvent) throw new NotFoundError(`Event tidak ditemukan dengan id: ${id}`);

    // check event selain dirinya apakah ada yang sama
    const check = await Events.findOne({ title, _id: { $ne: id } });
    if (check) throw new BadRequestError('Event sudah terdaftar');  


    const result = await Events.findByIdAndUpdate( 
        id,
        {  title, date, about, tagline, keyPoint, venueName, statusEvent, tickets, image, category, talent },
        { new: true, runValidators: true }        
    );

    

    return result;
}

const deleteEvent = async (req) => {
    const { id } = req.params;
    const result = await Events.findByIdAndDelete(id);

    if (!result) throw new NotFoundError(`Event tidak ditemukan dengan id: ${id}`);

    return result;
}



module.exports = {
    getAllEvents,
    getOneEvent,
    createEvent,
    updateEvent,
    deleteEvent,
}