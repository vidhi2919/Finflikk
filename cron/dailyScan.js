const cron = require('node-cron');
const Transaction = require('../models/Transaction');
const FraudScan = require('../models/FraudScan');
const { sendAlertEmail } = require('../utils/email'); // Make sure this exists and works

// Main function to run the daily fraud scan
async function runDailyFraudScan() {
  try {
    console.log('🕵️‍♂️ Starting daily fraud scan...');

    // Get transactions from the last 24 hours
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentTxns = await Transaction.find({ timestamp: { $gte: yesterday } });

    // Loop through recent transactions to check for suspicious activity
    for (const txn of recentTxns) {
      let flags = [];

      // Example rule: large withdrawals flagged
      if (txn.type === 'withdrawal' && txn.amount > 50000) {
        flags.push('Large withdrawal amount');
      }

      // Add other rules here if you want, e.g.,
      // if (txn.amount > 100000 && txn.type === 'transfer') flags.push('Very large transfer');

      if (flags.length > 0) {
        // Save flagged transaction in FraudScan collection
        await FraudScan.create({
          fromWalletId: txn.fromWallet,
          amount: txn.amount,
          currency: txn.currency,
          type: txn.type,
          status: 'fraudulent',
          flags
        });

        // Mock sending alert email to admin
        await sendAlertEmail(
          'admin@digitalwallet.com', // Admin email (adjust)
          '⚠️ Suspicious Transaction Detected',
          `Transaction ID: ${txn._id} flagged for: ${flags.join(', ')}`
        );

        console.log(`⚠️ Transaction ${txn._id} flagged and email alert sent.`);
      }
    }

    console.log('✅ Daily fraud scan complete');
  } catch (error) {
    console.error('❌ Error during daily fraud scan:', error);
  }
}

// Schedule the job to run every day at midnight
cron.schedule('0 0 * * *', runDailyFraudScan);
// cron.schedule('* * * * *', runDailyFraudScan); // runs every minute


module.exports = runDailyFraudScan;
