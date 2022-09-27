const mongoose = require('mongoose');

const Member = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    workspace: {
      type: String,
      ref: 'Workspace',
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'member'],
      default: 'member',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', Member);
