// exports.sendAlertEmail = async (txn) => {
//   console.log(`ALERT: Suspicious transaction flagged: ${txn._id}, Reason: ${txn.reason}`);
// };

// utils/email.js (mock example)
// async function sendAlertEmail(to, subject, message) {
//   console.log(`Mock Email sent to ${to}: ${subject} - ${message}`);
// }
// module.exports = { sendAlertEmail };

exports.sendAlertEmail = (transaction) => {
  console.log(`🚨 MOCK EMAIL ALERT 🚨
Subject: Suspicious Transaction Detected

Details:
- Transaction ID: ${transaction._id}
- Type: ${transaction.type}
- Amount: ${transaction.amount} ${transaction.currency}
- From Wallet: ${transaction.fromWallet}
- To Wallet: ${transaction.toWallet || 'N/A'}
- Status: ${transaction.status || 'not specified'}
- Timestamp: ${transaction.timestamp}

📬 This is a simulated alert. No real email was sent.
`);
};
