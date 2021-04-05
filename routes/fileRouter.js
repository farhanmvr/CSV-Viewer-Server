const express = require('express');
const router = express.Router();

const {
  fileProcess,
  convertFile,
  saveToDB,
} = require('../controllers/fileController');

router.post('/', fileProcess, convertFile, saveToDB);

module.exports = router;
