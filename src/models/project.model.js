const mongoose = require('mongoose');

const { nanoid } = require('nanoid');

const { Schema } = mongoose;

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

const Member = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'member'],
      default: 'member',
    },
  },
  { timestamps: true }
);

const Project = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },

    _id: {
      type: String,
      default: nanoid(10),
    },

    description: {
      type: String,
      default: '',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    collaborators: [Member],
  },
  { timestamps: true }
);

Project.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Project', Project);
