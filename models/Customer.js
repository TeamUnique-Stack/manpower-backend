const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true
  },
  contactPerson: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    designation: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  gstin: {
    type: String,
    unique: true,
    sparse: true
  },
  pan: {
    type: String
  },
  contractDetails: {
    startDate: Date,
    endDate: Date,
    duration: String,
    serviceCharge: {
      type: Number,
      default: 10
    },
    paymentTerms: String
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Pending'],
    default: 'Active'
  },
  requirements: [{
    role: String,
    quantity: Number,
    location: {
      state: String,
      city: String,
      site: String
    },
    expectedCTC: Number,
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Fulfilled', 'Closed'],
      default: 'Open'
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);

// Made with Bob
