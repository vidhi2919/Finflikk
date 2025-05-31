const Transaction = require('../models/Transaction');

exports.checkForFraud = async (txn) => {
  if (txn.amount > 5000) {
    return { flagged: true, reason: 'Large transfer detected' };
  }
  const oneMinuteAgo = new Date(Date.now() - 60000);
  const recent = await Transaction.countDocuments({
    fromWallet: txn.fromWallet,
    timestamp: { $gte: oneMinuteAgo }
  });
  if (recent > 5) {
    return { flagged: true, reason: 'Too many transfers in short time' };
  }
  return { flagged: false };
};