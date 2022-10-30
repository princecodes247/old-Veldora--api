const mongoose = require('mongoose');

const Submission = new mongoose.Schema(
  {
    data: Object,
    project: {
      type: String,
      required: [true, 'Project ID is required'],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', Submission);
