const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const { Schema } = mongoose;

const Form = new mongoose.Schema(
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

Form.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Form', Form);
