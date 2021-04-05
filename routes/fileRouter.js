const express = require('express');
const router = express.Router();

const { convertFile } = require('../controllers/fileController');

router.post('/', convertFile);

module.exports = router;
