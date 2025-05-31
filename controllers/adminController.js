const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');

exports.flaggedTransactions = async (req, res) => {
  const txns = await Transaction.find({ isFlagged: true });
  res.json(txns);
};

exports.totalBalances = async (req, res) => {
  const result = await Wallet.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$currency', total: { $sum: '$balance' } } }
  ]);
  res.json(result);
};

exports.topUsers = async (req, res) => {
  const result = await Wallet.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$user', total: { $sum: '$balance' } } },
    { $sort: { total: -1 } },
    { $limit: 5 }
  ]);
  res.json(result);
};