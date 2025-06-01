const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const { checkForFraud } = require('../utils/fraudDetector');
const { sendAlertEmail } = require('../utils/email');

exports.deposit = async (req, res) => {
  const { currency, amount } = req.body;
  try {
    const wallet = await Wallet.findOne({ user: req.user._id, currency });
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
    wallet.balance += amount;
    await wallet.save();

    const txn = new Transaction({ toWallet: wallet._id, amount, currency, type: 'deposit' });
    await txn.save();
    res.json({ wallet, txn });
  } catch {
    res.status(500).json({ error: 'Deposit failed' });
  }
};

exports.withdraw = async (req, res) => {
  const { currency, amount } = req.body;
  try {
    const wallet = await Wallet.findOne({ user: req.user._id, currency });
    if (!wallet || wallet.balance < amount) return res.status(400).json({ error: 'Insufficient funds' });
    if (amount > wallet.withdrawalLimit) return res.status(400).json({ error: 'Withdrawal exceeds limit' });

    wallet.balance -= amount;
    await wallet.save();

    const txn = new Transaction({ fromWallet: wallet._id, amount, currency, type: 'withdrawal' });
    const fraud = await checkForFraud(txn);
    txn.isFlagged = fraud.flagged;
    txn.reason = fraud.reason;
    await txn.save();

    if (txn.isFlagged) await sendAlertEmail(txn);
    res.json({ wallet, txn });
  } catch {
    res.status(500).json({ error: 'Withdrawal failed' });
  }
};

exports.transfer = async (req, res) => {
  const { currency, amount, toUserId } = req.body;
  try {
    const fromWallet = await Wallet.findOne({ user: req.user._id, currency });
    const toWallet = await Wallet.findOne({ user: toUserId, currency });
    if (!fromWallet || !toWallet) return res.status(404).json({ error: 'Wallet not found' });
    if (fromWallet.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });

    fromWallet.balance -= amount;
    toWallet.balance += amount;
    await fromWallet.save();
    await toWallet.save();

    const txn = new Transaction({ fromWallet: fromWallet._id, toWallet: toWallet._id, amount, currency, type: 'transfer' });
    const fraud = await checkForFraud(txn);
    txn.isFlagged = fraud.flagged;
    txn.reason = fraud.reason;
    await txn.save();

    if (txn.isFlagged) await sendAlertEmail(txn);
    res.json({ fromWallet, toWallet, txn });
  } catch {
    res.status(500).json({ error: 'Transfer failed' });
  }
};

exports.softDeleteTransaction = async (req, res) => {
  const { id } = req.params;
  await Transaction.findByIdAndUpdate(id, { isDeleted: true });
  res.json({ message: 'Transaction soft-deleted' });
};
