const { StatusCodes } = require('http-status-codes');
const { 
    signupParticipant, activateParticipant, signinParticipant, 
    getAllEvents,
    getOneEvent,
    getParticipantOrder,
    checkoutOrder
} = require('../../../services/mongoose/participants');

const signUp = async (req, res, next) => {
    try {
        const data = await signupParticipant(req);
        res.status(StatusCodes.CREATED).json({ 
            message: 'Signup berhasil, OTP terkirim ke email',
            data, 
        });
    } catch (error) {
        next(error);
    }
}

const activate = async (req, res, next) => {
    try {
        const data = await activateParticipant(req);
        res.status(StatusCodes.OK).json({
            message: 'Berhasil aktivasi akun',
            data, 
        });
    } catch (error) {
        next(error);
    }
}

const signin = async (req, res, next) => {
    try {
        const data = await signinParticipant(req);
        res.status(StatusCodes.OK).json({
            data, 
        });
    } catch (error) {
        next(error);
    }
}

const getAllLandingPage = async (req, res, next) => {
    try {
        const data = await getAllEvents(req);
        res.status(StatusCodes.OK).json({
            data, 
        });
    } catch (error) {
        next(error)
    }
}

const getOneLandingPage = async (req, res, next) => {
    try {
        const data = await getOneEvent(req);
        res.status(StatusCodes.OK).json({
            data, 
        });
    } catch (error) {
        next(error)
    }
}

const getOrderParticipant = async (req, res, next) => {
    try {
        const data = await getParticipantOrder(req);
        res.status(StatusCodes.OK).json({
            data, 
        });
    } catch (error) {
        next(error)
    }
}

const checkout = async (req, res, next) => {
    try {
        const data = await checkoutOrder(req);
        res.status(StatusCodes.CREATED).json({ 
            data, 
        });
    } catch (error) {
        next(error)
    }
}


module.exports = {
    signUp,
    activate,
    signin,
    getAllLandingPage,
    getOneLandingPage,
    getOrderParticipant,
    checkout,
}