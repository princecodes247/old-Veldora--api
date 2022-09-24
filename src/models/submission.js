const mongoose = require('mongoose');

const Submission = new mongoose.Schema(
  {
    data: Object,
    form: {
      type: String,
      required: [true, 'Form ID is required'],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', Submission);
