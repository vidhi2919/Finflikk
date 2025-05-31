const cron = require('node-cron');
const Transaction = require('../models/Transaction');
const { sendAlertEmail } = require('../utils/email');

cron.schedule('0 0 * * *', async () => {
  const suspicious = await Transaction.find({ isFlagged: true });
  suspicious.forEach(txn => sendAlertEmail(txn));
  console.log('Daily fraud scan complete');
});