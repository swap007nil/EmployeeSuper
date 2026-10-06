const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    visitorName:   { type: String, required: true, trim: true },
    mobile:        { type: String, required: true, match: /^[0-9]{10}$/ },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        'Please enter a valid email address (e.g. name@gmail.com)',
      ],
    },
    organization:  { type: String, trim: true },
    personToMeet:  { type: String, required: true, trim: true },
    purpose:       { type: String, required: true, trim: true },
    visitDateTime: { type: Date, default: Date.now },
    status:        { type: String, enum: ['Checked In', 'Checked Out'], default: 'Checked In' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Visitor', visitorSchema);