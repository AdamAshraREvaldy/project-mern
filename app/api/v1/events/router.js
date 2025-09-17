// app/api/v1/events/router.js
const express = require('express');
const router = express.Router();
const { create, find, index, update, destroy, updateEventStatus } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

router.get('/events', authenticateUser, authorizeRoles('organizer'), find);
router.get('/events/:id', authenticateUser, authorizeRoles('organizer'), index);
router.post('/events', authenticateUser, authorizeRoles('organizer'), create);
router.put('/events/:id', authenticateUser, authorizeRoles('organizer'), update);
router.patch('/events/:id/status', authenticateUser, authorizeRoles('organizer'), updateEventStatus);
router.delete('/events/:id', authenticateUser, authorizeRoles('organizer'), destroy);


module.exports = router;