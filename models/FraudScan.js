const mongoose = require('mongoose');

const fraudScanSchema = new mongoose.Schema({
  fromWalletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'transfer'],
    required: true
  },
  status: {
    type: String,
    enum: ['safe', 'fraudulent'],
    required: true
  },
  flags: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FraudScan', fraudScanSchema);
