const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const dataSchema = new mongoose.Schema(
  {
    contents: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Data', dataSchema);
