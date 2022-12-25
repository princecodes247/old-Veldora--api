const mongoose = require('mongoose');

const Submission = new mongoose.Schema(
  {
    data: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', Submission);
