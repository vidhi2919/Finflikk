// controllers/fraudScanController.js
const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const FraudScan = require('../models/FraudScan');

exports.scanTransaction = async (req, res) => {
  try {
    const { fromWalletId, amount, type } = req.body;

    let flags = [];

    // Rule 1: Sudden large withdrawal
    if (type === 'withdrawal' && amount > 50000) {
      flags.push('Large withdrawal detected');
    }
    if (!fromWalletId || !amount || !type || !req.body.currency) {
        return res.status(400).json({ error: 'Missing required fields' });
    }



    // Rule 2: Multiple rapid transfers from the same wallet in the last 1 minute
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const recentTransfers = await Transaction.find({
      fromWallet: fromWalletId,
      type: 'transfer',
      timestamp: { $gte: oneMinuteAgo }
    });

    if (recentTransfers.length >= 5) {
      flags.push('Multiple rapid transfers detected');
    }

    const isFraudulent = flags.length > 0;

    // Optional: Save transaction log with fraud flags
    const newTransaction = new Transaction({
      fromWallet: fromWalletId,
      amount,
      currency: req.body.currency || 'INR',
      type,
      isFlagged: isFraudulent,
      reason: isFraudulent ? flags.join('; ') : undefined,
      timestamp: new Date()
    });

    await newTransaction.save();

    //added j now
    await FraudScan.create({
      fromWalletId,
      amount,
      currency: req.body.currency,
      type,
      status: isFraudulent ? 'fraudulent' : 'safe',
      flags
    });

    res.json({
      status: isFraudulent ? 'fraudulent' : 'safe',
      flags,
      transactionId: newTransaction._id
    });

  } catch (error) {
    console.error('Error in fraud scan:', error);
    res.status(500).json({ error: 'Fraud scan failed' });
  }
};
