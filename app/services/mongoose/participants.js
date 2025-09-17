const Participants = require('../../api/v1/participants/model');
const Events = require('../../api/v1/events/model');
const Orders = require('../../api/v1/orders/model');
const Payments = require('../../api/v1/payments/model');
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../errors/');
const { createTokenParticipant, createJWT } = require('../../utils');

const { otpMail, invoiceMail } = require('../email');

const signupParticipant = async (req) => {
    const { firstName, lastName, email, password, role } = req.body;

    let result = await Participants.findOne({ email, status: 'tidak aktif' });

    if (!result) {
        result = await Participants.create({
            firstName,
            lastName,
            email,
            password,
            role,
            otp: Math.floor(Math.random() * 9999),
        });
    } else {
        result.firstName = firstName;
        result.lastName = lastName;
        result.role = role;
        result.email = email;
        result.password = password;
        result.otp = Math.floor(Math.random() * 9999);
        await result.save();
    }

    await otpMail(email, result);

    delete result._doc.password;
    delete result._doc.otp;

    return result;
}

const activateParticipant = async (req) => {
    const { email, otp } = req.body;

    const checkParticipant = await Participants.findOne({ email });
    if (!checkParticipant) throw new NotFoundError("Participant belum terdaftar");

    if (checkParticipant && checkParticipant.otp !== otp) throw new BadRequestError("Kode otp salah!");
    

    const result = await Participants.findByIdAndUpdate(
        checkParticipant._id,
        { status: 'aktif'},
        { new: true, runValidators: true }
    );

    return result.status;
}

const signinParticipant = async (req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("please provided email and password");
    }

    const checkUser = await Participants.findOne({ email });
    
    if (!checkUser) throw new UnauthorizedError("Invalid credentials");

    if (checkUser.status === 'tidak aktif') throw new BadRequestError("Akun anda belum di aktivasi");

    const isPasswordCorrect = await checkUser.comparePassword(password);
    if (!isPasswordCorrect) throw new UnauthorizedError("invalid credentials");

    const token = createJWT({ payload: createTokenParticipant(checkUser) });
    
    return token;
    
};

const getAllEvents = async (req) => {
    const events = await Events.find({ statusEvent: 'Published'})
        .populate('category')
        .populate('image')
        .select('_id title date tickets venueName');
    return events
}

const getOneEvent = async (req) => {
    const event = await Events.findOne({ _id: req.params.id })
        .populate('category')
        .populate({ path: 'talent', populate: 'image' })
        .populate('image');
    if (!event) throw new NotFoundError(`Tidak ada acara dengan id :  ${id}`);

    return event;
}

const getParticipantOrder = async (req) => {
    console.log(req.participant.id);
    const order = await Orders.find({ participant: req.participant.id });

    return order;
}

const checkoutOrder = async (req) => {

    const { event, personalDetail, payment, tickets } = req.body;

    const checkingEvent = await Events.findOne({ _id: event });
    if (!checkingEvent) {
        throw new NotFoundError('Tidak ada acara dengan id : ' + event);
    }

    const checkingPayment = await Payments.findOne({ _id: payment });

    if (!checkingPayment) {
        throw new NotFoundError(
        'Tidak ada metode pembayaran dengan id :' + payment
        );
    }

    let totalPay = 0,
        totalOrderTicket = 0;
    await tickets.forEach((tic) => {
        checkingEvent.tickets.forEach((ticket) => {
        if (tic.ticketCategories.type === ticket.type) {
            if (tic.sumTicket > ticket.stock) {
            throw new NotFoundError('Stock event tidak mencukupi');
            } else {
            ticket.stock -= tic.sumTicket;

            totalOrderTicket += tic.sumTicket;
            totalPay += tic.ticketCategories.price * tic.sumTicket;
            }
        }
        });
    });

    await checkingEvent.save();

    const historyEvent = {
        title: checkingEvent.title,
        date: checkingEvent.date,
        about: checkingEvent.about,
        tagline: checkingEvent.tagline,
        keyPoint: checkingEvent.keyPoint,
        venueName: checkingEvent.venueName,
        tickets: tickets,
        image: checkingEvent.image,
        category: checkingEvent.category,
        talent: checkingEvent.talent,
        organizer: checkingEvent.organizer,
    };

    const result = new Orders({
        date: new Date(),
        personalDetail: personalDetail,
        totalPay,
        totalOrderTicket,
        orderItems: tickets,
        participant: req.participant.id,
        event,
        historyEvent,
        payment,
    });

    await result.save();
    // await invoiceMail(result.personalDetail.email, result);
    await invoiceMail(result.personalDetail.email, result.toObject());

    // console.log(result.personalDetail.email);
    return result;
};

module.exports = { 
    signupParticipant,
    activateParticipant,
    signinParticipant,
    getAllEvents,
    getOneEvent,
    getParticipantOrder,
    checkoutOrder,
}