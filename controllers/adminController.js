const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');

exports.flaggedTransactions = async (req, res) => {
  try {
    const txns = await Transaction.find({ isFlagged: true });
    res.json(txns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flagged transactions' });
  }
};

exports.totalBalances = async (req, res) => {
  try {
    const result = await Wallet.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: '$currency', total: { $sum: '$balance' } } }
    ]);
    const formatted = result.map(item => ({
      currency: item._id,
      totalBalance: item.total
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch total balances' });
  }
};

exports.topUsers = async (req, res) => {
  try {
    const result = await Wallet.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: '$user', total: { $sum: '$balance' } } },
      { $sort: { total: -1 } },
      { $limit: 5 }
    ]);
    const formatted = result.map(item => ({
      userId: item._id,
      totalBalance: item.total
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch top users' });
  }
};
