const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/organizers/model');
const { BadRequestError, NotFoundError } = require('../../errors/');

const createUserOrganizer = async (req) => {
    const { organizer, name, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) throw new BadRequestError('password dan confirm password tidak cocok');

    const createOrganizer = await Organizers.create({ organizer });
    const createUser = await Users.create({ name, email, password, role, organizer: createOrganizer._id });
    
    delete createUser._doc.password;

    return createUser;
}

const createUser = async (req) => {
    const { name, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) throw new BadRequestError('password dan confirm password tidak cocok');

    const createUser = await Users.create({ name, email, password, role, organizer: req.user.organizer });
    

    return createUser;
}

module.exports = { createUserOrganizer, createUser }