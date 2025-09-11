const express = require('express');
const router = express.Router();
const { signinCms } = require('./controller');

router.post('/auth/sigin', signinCms);

module.exports = router;