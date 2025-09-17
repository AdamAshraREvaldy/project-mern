const express = require('express');
const router = express.Router();
const { signUp, activate, signin, getAllLandingPage, getOneLandingPage, getOrderParticipant, checkout } = require('./controller');
const { authenticateParticipant } = require('../../../middlewares/auth');

router.post('/auth/participants', signUp);
router.post('/activate/participants', activate);
router.post('/login/participants', signin);
router.get('/participants', getAllLandingPage);
router.get('/participants/:id', getOneLandingPage);
router.get('/order/participants', authenticateParticipant, getOrderParticipant);
router.post('/order/checkout', authenticateParticipant, checkout);



module.exports = router;