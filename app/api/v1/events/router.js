// app/api/v1/events/router.js
const express = require('express');
const router = express.Router();
const { create, find, index, update, destroy } = require('./controller');

router.get('/events', find);
router.get('/events/:id', index);
router.post('/events', create);
router.put('/events/:id', update);
router.delete('/events/:id', destroy);


module.exports = router;