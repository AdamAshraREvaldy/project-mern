// app/api/v1/talents/router.js
const express = require('express');
const router = express.Router();
const { create, find, index, update, destroy } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

router.get('/talents', authenticateUser, authorizeRoles('organizer'), find);
router.get('/talents/:id', authenticateUser, authorizeRoles('organizer'), index);
router.post('/talents', authenticateUser, authorizeRoles('organizer'), create);
router.put('/talents/:id', authenticateUser, authorizeRoles('organizer'), update);
router.delete('/talents/:id', authenticateUser, authorizeRoles('organizer'), destroy);


module.exports = router;