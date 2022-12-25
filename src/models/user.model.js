const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    password: String,
    quota: {
      type: Number,
      default: 50,
    },

    salt: String,

    verified: {
      type: Boolean,
      default: false,
    },

    suspended: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', User);
