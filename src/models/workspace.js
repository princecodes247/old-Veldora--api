const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const { Schema } = mongoose;

const Workspace = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'My Workspace',
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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner ID is required'],
    },
    quota: {
      type: Number,
      default: 250,
    },
  },
  { timestamps: true }
);

Workspace.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Workspace', Workspace);
