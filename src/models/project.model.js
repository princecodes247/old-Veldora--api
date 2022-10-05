const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const { Schema } = mongoose;

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

    workspace: {
      type: String,
      ref: 'Workspace',
      required: [true, 'Workspace is required'],
    },
  },
  { timestamps: true }
);

Project.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Project', Project);
