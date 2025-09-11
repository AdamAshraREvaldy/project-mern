// app/api/v1/talents/router.js
const express = require('express');
const router = express.Router();
const { create, find, index, update, destroy } = require('./controller');

router.get('/talents', find);
router.get('/talents/:id', index);
router.post('/talents', create);
router.put('/talents/:id', update);
router.delete('/talents/:id', destroy);


module.exports = router;