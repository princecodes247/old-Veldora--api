const mongoose = require('mongoose');

const Submission = new mongoose.Schema(
  {
    data: Object,

    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', Submission);
