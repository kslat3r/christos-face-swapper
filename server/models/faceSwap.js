const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  fileName: String,
  url: String,
  mimeType: String,
}, {
  minimize: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

module.exports = mongoose.model('FaceSwap', schema);
