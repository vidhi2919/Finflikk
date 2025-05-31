const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  currency:   { type: String, required: true },
  balance:    { type: Number, default: 0 },
  isDeleted:  { type: Boolean, default: false },
  withdrawalLimit: { type: Number, default: 10000 },
});

walletSchema.index({ user: 1, currency: 1 }, { unique: true });

module.exports = mongoose.model('Wallet', walletSchema);