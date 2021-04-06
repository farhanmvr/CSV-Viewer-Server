const path = require('path');
const fs = require('fs');
const multer = require('multer');
const csv = require('csvtojson');
const Data = require('../models/dataModel');

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}.csv`);
  },
});

const csvFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('csv') ||
    file.mimetype.includes('comma-separated-values')
  ) {
    cb(null, true);
  } else {
    cb('Please upload only csv file.', false);
  }
};

const upload = multer({ fileFilter: csvFilter, storage: multerStorage });

exports.fileProcess = upload.single('file');

exports.convertFile = async (req, res, next) => {
  if (req.file === undefined) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please upload a csv file',
    });
  }

  csv()
    .fromFile(req.file.path)
    .then((response) => {
      req.csv = response;
      fs.unlinkSync(req.file.path);
      next();
    })
    .catch((err) =>
      res.status(500).json({
        status: 'fail',
        message: 'Cannot convert csv file',
      })
    );
};

exports.saveToDB = async (req, res, next) => {
  try {
    const files = req.csv;
    const response = await Data.create({ contents: files });
    res.status(200).json({
      status: 'success',
      files: response,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Cannot save to DB',
    });
  }
};
