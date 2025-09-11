const express = require('express');
const router = express.Router();
const { create, createAdmin } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

router.post('/organizers', create);
router.post('/users', authenticateUser, createAdmin);

module.exports = router;