const express = require('express');
const router = express.Router();
const { create, findCategory, index, update, destroy } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

router.get('/categories', authenticateUser, authorizeRoles('organizer'), findCategory);
router.get('/categories/:id', authenticateUser, authorizeRoles('organizer'), index);
router.post('/categories', authenticateUser, authorizeRoles('organizer'), create);
router.put('/categories/:id', authenticateUser, authorizeRoles('organizer'), update);
router.delete('/categories/:id', authenticateUser, authorizeRoles('organizer'), destroy);


module.exports = router;