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
