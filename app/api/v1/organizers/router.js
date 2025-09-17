const express = require('express');
const router = express.Router();
const { createOwner, create, createAdmin } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

router.post('/owner', createOwner);
router.post('/organizers', authenticateUser, authorizeRoles('owner'), create);
router.post('/users', authenticateUser, authorizeRoles('organizer'), createAdmin);

module.exports = router;