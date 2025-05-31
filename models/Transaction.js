const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  fromWallet:   { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  toWallet:     { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  amount:       { type: Number, required: true },
  currency:     { type: String, required: true },
  type:         { type: String, enum: ['deposit', 'withdrawal', 'transfer'], required: true },
  timestamp:    { type: Date, default: Date.now },
  isFlagged:    { type: Boolean, default: false },
  reason:       { type: String }
});

module.exports = mongoose.model('Transaction', transactionSchema);