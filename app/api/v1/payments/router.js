const express = require('express');
const router = express.Router();
const { create, find, index, update, destroy } = require('./controller');

const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

router.get('/payments', authenticateUser, authorizeRoles('organizer'), find);
router.get('/payments/:id', authenticateUser, authorizeRoles('organizer'), index);
router.post('/payments', authenticateUser, authorizeRoles('organizer'), create);
router.put('/payments/:id', authenticateUser, authorizeRoles('organizer'), update);
router.delete('/payments/:id', authenticateUser, authorizeRoles('organizer'), destroy);


module.exports = router;