const express = require('express');
const router = express.Router();
const { create, findCategory, index, update, destroy } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

router.get('/categories', authenticateUser, authorizeRoles('organizer', 'admin'), findCategory);
router.get('/categories/:id', authenticateUser, authorizeRoles('organizer', 'admin'), index);
router.post('/categories', authenticateUser, create);
router.put('/categories/:id', authenticateUser, update);
router.delete('/categories/:id', authenticateUser, destroy);


module.exports = router;