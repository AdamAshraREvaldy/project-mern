const { UnauthenticatedError, UnauthorizedError } = require('../errors/');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
    try {
        let token;
        // check header
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            throw new UnauthenticatedError("Authentication invalid");
        }

        const payload = isTokenValid({ token });

        // ambil data login user dari req
        req.user = {
            email: payload.email,
            role: payload.role,
            name: payload.name,
            organizer: payload.organizer,
            id: payload.userId,
        };

        next();
    } catch (error) {
        next(error);
    }
};

const authenticateParticipant = async (req, res, next) => {
    try {
        let token;
        // check header
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            throw new UnauthenticatedError("Authentication invalid");
        }

        const payload = isTokenValid({ token });

        req.participant = {
            id: payload.participantId,
            firstName: payload.firstName,
            lastName: payload.lastName,
            status: payload.status,
            email: payload.email,
        }

        next();
    } catch (error) {
        next(error);
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError("Unauthorized to access this route");
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRoles, authenticateParticipant };